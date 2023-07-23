"use client"

import { FC } from "react"
import { Store } from "@prisma/client"
import { Trash } from "lucide-react"

import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface SettingsFormProps {
    initialData: Store
}

export const SettingsForm: FC<SettingsFormProps> = ({initialData}) => {
  return (
    <>
        <div className="flex items-center justify-between mb-4">
            <Heading
                title="Setting"
                description="Manage store preferences"
                />
            <Button variant="destructive" size="icon">
                <Trash size={16} />
            </Button>
        </div>
        <Separator />
    </>
  )
}
