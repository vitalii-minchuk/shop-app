import * as Zod from 'zod'

export const storeFormSchema = Zod.object({
    name: Zod.string().min(1)
})

export type StoreFormType = Zod.infer<typeof storeFormSchema>

export const settingsFormSchema = Zod.object({
    name: Zod.string().min(1)
})

export type SettingsFormType = Zod.infer<typeof settingsFormSchema>

export const billboardFormSchema = Zod.object({
    label: Zod.string().min(1),
    imageUrl: Zod.string().min(1),
})

export type BillboardFormType = Zod.infer<typeof billboardFormSchema>

export const categoryFormSchema = Zod.object({
    name: Zod.string().min(1),
    billboardId: Zod.string().min(1)
})

export type CategoryFormType = Zod.infer<typeof categoryFormSchema>

export const sizeFormSchema = Zod.object({
    name: Zod.string().min(1),
    value: Zod.string().min(1)
})

export type SizeFormType = Zod.infer<typeof sizeFormSchema>

export const colorFormSchema = Zod.object({
    name: Zod.string().min(1),
    value: Zod.string().min(1)
})

export type ColorFormType = Zod.infer<typeof colorFormSchema>

