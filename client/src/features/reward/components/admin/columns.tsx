"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Hadiah } from "../../types"
import { Button } from "@/components/ui/button"
import { Eye, Pencil } from "lucide-react"
import Link from "next/link"
import { ButtonDeleteHadiah } from "./button-delete-hadiah"

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends unknown, TValue> {
    className?: string
  }
}

export const getColumns = (page: number, limit: number): ColumnDef<Hadiah>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => (page - 1) * limit + row.index + 1,
    meta: {
      className: "w-[40px]",
    },
  },
  {
    accessorKey: "nama",
    header: "Nama Hadiah",
  },
  {
    accessorKey: "stok",
    header: "Stok",
  },
  {
    accessorKey: "harga_poin",
    header: "Harga Poin",
  },
  {
    accessorKey: "created_at",
    header: "Dibuat",
    cell: ({ row }) =>
      new Date(row.original.created_at).toLocaleDateString("id-ID"),
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const hadiah = row.original
      return (
        <div className="flex items-center justify-center gap-2">
          <Link href={`/admin/manage-reward/detail/${hadiah.id}`}>
            <Button variant="outline" size="icon">
              <Eye className="w-4 h-4 text-primary-1" />
            </Button>
          </Link>
          <Link href={`/admin/manage-reward/edit/${hadiah.id}`}>
            <Button variant="outline" size="icon">
              <Pencil className="w-4 h-4 text-primary-1" />
            </Button>
          </Link>
          <ButtonDeleteHadiah hadiahId={hadiah.id} />
        </div>
      )
    },
    meta: {
      className: "w-[120px] text-center",
    },
  },
]
