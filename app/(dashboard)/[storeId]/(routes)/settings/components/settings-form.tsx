"use client"

import { FC, useState } from "react"
import { Store } from "@prisma/client"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import axios from "axios"

import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SettingsFormType, settingsFormSchema } from "@/validation"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AlertModal } from "@/components/modals/alert-modal"
import { ApiAlert } from "@/components/ui/api-alert"
import { useOrigin } from "@/hooks/use-origin"

interface SettingsFormProps {
    initialData: Store
}

export const SettingsForm: FC<SettingsFormProps> = ({initialData}) => {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    const appOrigin = useOrigin()

    const params = useParams()
    const router = useRouter()

    const form = useForm<SettingsFormType>({
        resolver: zodResolver(settingsFormSchema),
        defaultValues: {
            name: initialData.name,
        }
    })

    const onSubmit = async (values: SettingsFormType) => {
        try {
            setIsLoading(true)
            await axios.patch(`/api/stores/${params.storeId}`, values)
            router.refresh()
            toast.success('Store updated')
        } catch (error: unknown) {
            error instanceof Error && error.message
              ? toast.error(error.message)
              : toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true)
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh()
            router.push('/')
            toast.success('Store has been deleted')
        } catch (error: unknown) {
              toast.error('Make sure you removed all products and categories first')
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <>
        <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={isLoading}
        />
        <div className="flex items-center justify-between mb-4">
            <Heading
                title="Setting"
                description="Manage store preferences"
                />
            <Button
                variant="destructive"
                size="icon"
                onClick={() => setOpen(true)}
            >
                <Trash size={16} />
            </Button>
        </div>
        <Separator />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <div className="grid grid-cols-3 gap-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name:</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        placeholder="Store name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />   
                </div>
                <Button disabled={isLoading} type="submit">Save changes</Button>
            </form>
        </Form>
        <Separator />
        <ApiAlert
            title="NEXT_PUBLIC_API_URL"
            description={`${appOrigin}/api/${params.storeId}`}
            variant="public"
        />
    </>
  )
}
