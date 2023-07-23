"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { toast } from "react-hot-toast"
import {zodResolver} from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Modal } from "@/components/ui/modal"
import { useStoreModal } from "@/hooks/use-store-modal"
import { StoreFormType, storeFormSchema } from "@/validation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const StoreModal = () => {
  const [isLoading, setIsLoading] = useState(false)
    const storeModal = useStoreModal()

    const form = useForm<StoreFormType>({
      resolver: zodResolver(storeFormSchema),
      defaultValues: {
        name: ''
      }
    })

    const onSubmit = async (values: StoreFormType) => {
      try {
        setIsLoading(true)
        
       const response = await axios.post('/api/stores', values)

       window.location.assign(`/${response.data.id}`)
      } catch (error: unknown) {
        error instanceof Error && error.message
          ? toast.error(error.message)
          : toast.error('Something went wrong')
      } finally {
        setIsLoading(false)
      } 
    }

  return (
    <Modal
        title="Create store"
        description="Add a new store to manage products and categories"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name:</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="E-commerce" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-2 w-full">
            <Button disabled={isLoading} variant="outline" onClick={storeModal.onClose}>Cancel</Button>
            <Button disabled={isLoading} type="submit">Continue</Button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}
