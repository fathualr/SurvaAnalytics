"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Pengguna } from "../../types"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash } from "lucide-react"
import Link from "next/link"
import { ButtonDeletePengguna } from "../button-delete"

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends unknown, TValue> {
    className?: string
  }
}

export const getColumns = (page: number, limit: number): ColumnDef<Pengguna>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => (page - 1) * limit + row.index + 1,
    meta: {
      className: "w-[40px]",
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "Umum.nama",
    header: "Nama",
    cell: ({ row }) => row.original.Umum?.nama ?? "-",
  },
  {
    accessorKey: "Umum.poin",
    header: "Poin",
    cell: ({ row }) => row.original.Umum?.poin ?? "0",
  },
  {
    accessorKey: "last_sign_in_at",
    header: "Terakhir Masuk",
    cell: ({ row }) =>
      row.original.last_sign_in_at
        ? new Date(row.original.last_sign_in_at).toLocaleString("id-ID")
        : "-",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const pengguna = row.original;
      return (
        <div className="flex items-center justify-center gap-2">
          <Link href={`/admin/manage-user/detail/${pengguna.id}`}>
            <Button variant="outline" size="icon">
              <Eye className="w-4 h-4 text-primary-1" />
            </Button>
          </Link>
          <Link href={`/admin/manage-user/edit/${pengguna.id}`}>
            <Button variant="outline" size="icon">
              <Pencil className="w-4 h-4 text-primary-1" />
            </Button>
          </Link>
          <ButtonDeletePengguna userId={pengguna.id} />
        </div>
      )
    },
    meta: {
      className: "w-[120px] text-center",
    },
  }
]
