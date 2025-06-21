"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RewardExchange } from "../../types";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";
import { ButtonDeleteRewardExchange } from "./button-delete-reward-exchange";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends unknown, TValue> {
    className?: string;
  }
}

export const getColumns = (page: number, limit: number): ColumnDef<RewardExchange>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => (page - 1) * limit + row.index + 1,
    meta: {
      className: "w-[40px]",
    },
  },
  {
    accessorKey: "Umum.nama",
    header: "Nama Pengguna",
    cell: ({ row }) => row.original.Umum?.nama ?? "-",
  },
  {
    accessorKey: "total_poin",
    header: "Total Poin",
  },
  {
    accessorKey: "keterangan",
    header: "Keterangan",
  },
  {
    accessorKey: "created_at",
    header: "Tanggal",
    cell: ({ row }) =>
      new Date(row.original.created_at).toLocaleDateString("id-ID"),
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const penukaran = row.original;
      return (
        <div className="flex items-center justify-center gap-2">
          <Link href={`/admin/manage-exchange/detail/${penukaran.id}`}>
            <Button variant="outline" size="icon">
              <Eye className="w-4 h-4 text-primary-1" />
            </Button>
          </Link>
          <ButtonDeleteRewardExchange rewardExchangeId={penukaran.id} />
        </div>
      );
    },
    meta: {
      className: "w-[120px] text-center",
    },
  },
];
