import * as Zod from 'zod'

export const storeFormSchema = Zod.object({
    name: Zod.string().min(1)
})

export type StoreFormType = Zod.infer<typeof storeFormSchema>

export const settingsFormSchema = Zod.object({
    name: Zod.string().min(1)
})

export type SettingsFormType = Zod.infer<typeof settingsFormSchema>

