"use client"

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getColumns } from "./columns"
import { useAdminSurveyPayments } from "../../hooks/useAdminSurveyPayment"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function DataTableSurveyPayment() {
  const [page, setPage] = useState(1)
  const limit = 10
  const { isLoggedIn, loading: authLoading } = useAuth()
  const shouldFetch = isLoggedIn && !authLoading

  const { payments = [], meta, isLoading, isError, error } = useAdminSurveyPayments({
    page,
    limit,
    filters: { sort: "-created_at" },
    enabled: shouldFetch,
  })

  const table = useReactTable({
    data: payments,
    columns: getColumns(page, limit),
    getCoreRowModel: getCoreRowModel(),
  })

  if (authLoading) return <p className="p-4 text-center">Memuat autentikasi...</p>
  if (!isLoggedIn) return null
  if (isLoading) return <p className="p-4 text-center">Memuat data...</p>
  if (isError) return <p className="p-4 text-center text-red-500">Error: {error?.message}</p>

  const totalPages = meta?.total_pages ?? 1

  return (
    <>
      <div className="flex-grow">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="bg-primary-1 hover:bg-primary-1/80" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="text-center text-accent-1" key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
<TableCell
  key={cell.id}
  className={`align-middle text-center ${cell.column.columnDef.meta?.className ?? ""}`}
>
  {flexRender(cell.column.columnDef.cell, cell.getContext())}
</TableCell>

                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={getColumns(page, limit).length} className="h-24 text-center">
                  Tidak ada data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between mt-4">
        <p className="text-sm content-center">
          Halaman <strong>{page}</strong> dari <strong>{totalPages}</strong>
        </p>
        <div className="flex justify-end gap-3 items-center">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="w-20 hover:text-primary-1"
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="w-20 hover:text-primary-1"
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  )
}
