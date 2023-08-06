"use client"

import { FC, useState } from "react"
import { Billboard, Store } from "@prisma/client"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import axios from "axios"

import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BillboardFormType, billboardFormSchema } from "@/validation"
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
import { ImageUpload } from "@/components/ui/image-upload"

interface BillboardFormProps {
    initialData: Billboard | null
}

export const BillboardForm: FC<BillboardFormProps> = ({initialData}) => {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const params = useParams()
    const router = useRouter()

    const title = initialData ? 'Edit billboard' : 'Create billboard'
    const description = initialData ? 'Edit the billboard' : 'Create a new billboard'
    const toastMessage = initialData ? 'Billboard has been updated' : 'Billboard has been created'
    const action = initialData ? 'Save changes' : 'Create'

    const form = useForm<BillboardFormType>({
        resolver: zodResolver(billboardFormSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
        }
    })

    const onSubmit = async (data: BillboardFormType) => {
        try {
            setIsLoading(true)

            initialData
                ? await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)
                : await axios.post(`/api/${params.storeId}/billboards`, data)
            
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
            toast.success(toastMessage)
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
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            router.refresh()
            toast.success('Billboard has been deleted')
        } catch (error: unknown) {
              toast.error('Make sure you removed all categories using this billboard')
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
                title={title}
                description={description}
            />
            {initialData && (
                <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => setOpen(true)}
                >
                    <Trash size={16} />
                </Button>
            )}
        </div>
        <Separator />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Background image:</FormLabel>
                            <FormControl>
                                <ImageUpload
                                    disabled={isLoading}
                                    onChange={(url) => field.onChange(url)}
                                    onRemove={() => field.onChange('')}
                                    values={field.value ? [field.value] : []}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> 
                <div className="grid grid-cols-3 gap-8">
                    <FormField
                        control={form.control}
                        name="label"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Label:</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        placeholder="Billboard label"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />   
                </div>
                <Button disabled={isLoading} type="submit">{action}</Button>
            </form>
        </Form>
        <Separator />
    </>
  )
}
