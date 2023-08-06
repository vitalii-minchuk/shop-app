"use client"

import { FC } from "react"
import { useParams } from "next/navigation"

import { useOrigin } from "@/hooks/use-origin"
import { ApiAlert } from "@/components/ui/api-alert"

interface ApiListProps {
    entityName: string
    entityIdName: string
}
export const ApiList: FC<ApiListProps> = ({entityIdName, entityName}) => {
    const params = useParams()
    const appOrigin = useOrigin()

    const baseUrl = `${appOrigin}/api/${params.storeId}`

  return (
    <>
        <ApiAlert
            title="GET"
            variant="public"
            description={`${baseUrl}/${entityName}`}
        />
        <ApiAlert
            title="GET"
            variant="public"
            description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        />
        <ApiAlert
            title="POST"
            variant="admin"
            description={`${baseUrl}/${entityName}`}
        />
        <ApiAlert
            title="PATCH"
            variant="admin"
            description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        />
        <ApiAlert
            title="DELETE"
            variant="admin"
            description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        />
    </>
  )
}
