"use client"

import { FC, useState } from "react"
import { Size } from "@prisma/client"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import axios from "axios"

import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SizeFormType, sizeFormSchema } from "@/validation"
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

interface SizeFormProps {
    initialData: Size | null
}

export const SizeForm: FC<SizeFormProps> = ({initialData}) => {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const params = useParams()
    const router = useRouter()

    const title = initialData ? 'Edit size' : 'Create size'
    const description = initialData ? 'Edit the size' : 'Create a new size'
    const toastMessage = initialData ? 'Size has been updated' : 'Size has been created'
    const action = initialData ? 'Save changes' : 'Create'

    const path = `/${params.storeId}/sizes`

    const form = useForm<SizeFormType>({
        resolver: zodResolver(sizeFormSchema),
        defaultValues: initialData || {
            name: '',
            value: ''
        }
    })

    const onSubmit = async (data: SizeFormType) => {
        try {
            setIsLoading(true)

            initialData
                ? await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data)
                : await axios.post(`/api/${params.storeId}/sizes`, data)
            
            router.refresh()
            router.push(path)
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
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
            router.refresh()
            router.push(path)
            toast.success('Size has been deleted')
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
                                        placeholder="Size name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />   
                    <FormField
                        control={form.control}
                        name="value"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Value:</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        placeholder="Size value"
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
    </>
  )
}
