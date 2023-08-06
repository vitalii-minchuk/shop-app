'use client'

import { FC } from "react"
import { useParams, useRouter } from "next/navigation"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { SizeColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface SizeClientProps {
  data: SizeColumn[]
}

export const SizeClient: FC<SizeClientProps> = ({data}) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable data={data} columns={columns} searchKey="name" />
      <Separator />
      <Heading
        title="API"
        description="API calls for size"
      />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  )
}
