"use client"

import { FC, useState } from "react"
import { Billboard, Category } from "@prisma/client"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import axios from "axios"

import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CategoryFormType, categoryFormSchema } from "@/validation"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CategoryFormProps {
    initialData: Category | null
    billboards: Billboard[]
}

export const CategoryForm: FC<CategoryFormProps> = ({initialData, billboards}) => {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const params = useParams()
    const router = useRouter()

    const title = initialData ? 'Edit category' : 'Create category'
    const description = initialData ? 'Edit the category' : 'Create a new category'
    const toastMessage = initialData ? 'Category has been updated' : 'Category has been created'
    const action = initialData ? 'Save changes' : 'Create'

    const path = `/${params.storeId}/categories`

    const form = useForm<CategoryFormType>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: initialData || {
            name: '',
            billboardId: ''
        }
    })

    const onSubmit = async (data: CategoryFormType) => {
        try {
            setIsLoading(true)

            initialData
                ? await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data)
                : await axios.post(`/api/${params.storeId}/categories`, data)
            
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
            await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)
            router.refresh()
            router.push(path)
            toast.success('Category has been deleted')
        } catch (error: unknown) {
              toast.error('Make sure you removed all categories using this category')
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
                                        placeholder="Category name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />   
                    <FormField
                        control={form.control}
                        name="billboardId"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Billboard:</FormLabel>
                                <Select
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                defaultValue={field.value}
                                                placeholder="Select a billboard"
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {billboards.map(b => (
                                            <SelectItem key={b.id} value={b.id}>{b.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
