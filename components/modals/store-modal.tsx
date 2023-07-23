"use client"

import { useForm } from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod'

import { Modal } from "@/components/ui/modal"
import { useStoreModal } from "@/hooks/use-store-modal"
import { StoreFormType, storeFormSchema } from "@/validation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const StoreModal = () => {
    const storeModal = useStoreModal()

    const form = useForm<StoreFormType>({
      resolver: zodResolver(storeFormSchema),
      defaultValues: {
        name: ''
      }
    })

    const onSubmit = async (values: StoreFormType) => {
console.log('%cstore-modal.tsx line:24 values', 'color: #007acc;', values);
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
                  <Input placeholder="E-commerce" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}
