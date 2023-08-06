'use client'

import { FC } from "react"
import { useParams, useRouter } from "next/navigation"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { ColorColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface ColorClientProps {
  data: ColorColumn[]
}

export const ColorClient: FC<ColorClientProps> = ({data}) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Colors (${data.length})`}
          description="Manage colors for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable data={data} columns={columns} searchKey="name" />
      <Separator />
      <Heading
        title="API"
        description="API calls for colors"
      />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  )
}
