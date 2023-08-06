"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellActions } from "./cell-actions"

export type CategoryColumn = {
  id: string
  name: string
  billboardLabel: string
  createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboardLabel",
    header: "Billboard label",
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
