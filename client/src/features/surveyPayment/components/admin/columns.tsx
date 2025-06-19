"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AdminSurveyPayment } from "../../types"
import { Eye } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ButtonDeleteSurveyPayment } from "./button-delete"

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends unknown, TValue> {
    className?: string
  }
}

export const getColumns = (page: number, limit: number): ColumnDef<AdminSurveyPayment>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => (page - 1) * limit + row.index + 1,
    meta: {
      className: "w-[40px]",
    },
  },
  {
    accessorKey: "judul_survei",
    header: "Judul Survei",
    cell: ({ row }) => {
      const judul = row.original.Survei?.judul;
      return (
        <span className={!judul ? "italic" : ""}>
          {judul || "Tidak tersedia"}
        </span>
      );
    },
  },
  {
    accessorKey: "email_klien",
    header: "Email Klien",
    cell: ({ row }) => {
      const email = row.original.Umum?.Pengguna?.email;
      return (
        <span className={!email ? "italic" : ""}>
          {email || "Tidak tersedia"}
        </span>
      );
    },
  },
  {
    accessorKey: "jumlah_tagihan",
    header: "Tagihan",
    cell: ({ row }) => `Rp ${Number(row.original.jumlah_tagihan).toLocaleString("id-ID")}`,
  },
  {
    accessorKey: "jumlah_dibayar",
    header: "Dibayar",
    cell: ({ row }) => `Rp ${Number(row.original.jumlah_dibayar).toLocaleString("id-ID")}`,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => row.original.status.replace(/_/g, " "),
  },
  {
    accessorKey: "metode_pembayaran",
    header: "Metode",
    cell: ({ row }) => row.original.metode_pembayaran ?? "-",
  },
  {
    accessorKey: "created_at",
    header: "Tanggal",
    cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString("id-ID"),
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <div className="flex items-center justify-center gap-2">
          <Link href={`/admin/manage-payment/detail/${payment.id}`}>
            <Button variant="outline" size="icon">
              <Eye className="w-4 h-4 text-primary-1" />
            </Button>
          </Link>
          <ButtonDeleteSurveyPayment paymentId={payment.id} />
        </div>
      )
    },
    meta: {
      className: "w-[80px] text-center",
    },
  },
]
