"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Survei } from "@/features/survey/types"
import { Button } from "@/components/ui/button"
import { Eye, Pencil } from "lucide-react"
import Link from "next/link"

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends unknown, TValue> {
    className?: string
  }
}

export const getColumns = (page: number, limit: number): ColumnDef<Survei>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => (page - 1) * limit + row.index + 1,
    meta: {
      className: "w-[40px]",
    },
  },
  {
    accessorKey: "judul",
    header: "Judul",
  },
  {
    accessorKey: "Umum.Pengguna.email",
    header: "Email Klien",
    cell: ({ row }) => row.original.Umum?.Pengguna?.email ?? "-",
  },
  {
    accessorKey: "tanggal_mulai",
    header: "Mulai",
    cell: ({ row }) =>
      new Date(row.original.tanggal_mulai).toLocaleDateString("id-ID"),
  },
  {
    accessorKey: "tanggal_berakhir",
    header: "Berakhir",
    cell: ({ row }) =>
      new Date(row.original.tanggal_berakhir).toLocaleDateString("id-ID"),
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const survei = row.original;
      return (
        <div className="flex items-center justify-center gap-2">
          <Link href={`/admin/manage-verification/review/${survei.id}`}>
            <Button variant="outline" size="icon" className="w-fit px-2 hover:text-primary-1">
              Review
            </Button>
          </Link>
        </div>
      )
    },
    meta: {
      className: "w-[100px] text-center",
    },
  }
]
