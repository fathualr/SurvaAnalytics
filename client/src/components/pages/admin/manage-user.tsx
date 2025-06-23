'use client';

import DataTableUser from "@/features/user/components/data-umum/data-table";
import Link from "next/link";

export function ManageUserPage() {
  return (
    <section className="flex flex-col flex-grow text-primary-1 gap-5 font-semibold">
      <h1 className="text-3xl font-bold">Data Pengguna - Umum</h1>

      <Link
        href="/admin/manage-user/add"
        className="rounded-md bg-primary-2 text-accent-1 border w-[120px] text-center text-sm p-2 hover:bg-accent-1 hover:text-primary-1 transition-all"
      >
        Tambah Data
      </Link>

      <DataTableUser />
    </section>
  );
}
