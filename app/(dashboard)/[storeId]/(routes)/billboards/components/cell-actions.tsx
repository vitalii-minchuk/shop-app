"use client"

import { FC, useState } from "react"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import axios from "axios"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { BillboardColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { AlertModal } from "@/components/modals/alert-modal"

interface CellActionsProps {
  data: BillboardColumn
}

export const CellActions: FC<CellActionsProps> = ({data}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const params = useParams()

  const path = `/${params.storeId}/billboards/${data.id}`

  const onCopy = () => {
    navigator.clipboard.writeText(data.id)
    toast.success('copied')
  }

  const onDelete = async () => {
    try {
        setIsLoading(true)
        await axios.delete(`/api/${params.storeId}/billboards/${data.id}`)
        setOpen(false)
        router.refresh()
        toast.success('Billboard has been deleted')
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push(path)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={onCopy}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
