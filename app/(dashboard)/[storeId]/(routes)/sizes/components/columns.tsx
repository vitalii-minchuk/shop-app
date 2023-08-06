"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellActions } from "./cell-actions"

export type SizeColumn = {
  id: string
  name: string
  value: string
  createdAt: string
}

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Size",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: 'id',
    header: '',
    cell: ({row}) => <CellActions data={row.original} />
  }
]
