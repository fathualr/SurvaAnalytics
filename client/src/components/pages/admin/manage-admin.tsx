'use client';

import DataTableAdmin from "@/features/user/components/data-admin/data-table";
import Link from "next/link";

export function ManageAdminPage() {
  return (
    <section className="flex flex-col flex-grow text-primary-1 gap-5 font-semibold">
      <h1 className="text-3xl font-bold">Data Pengguna - Admin</h1>

      <Link
        href="/admin/manage-admin/add"
        className="rounded-md bg-primary-2 text-accent-1 border w-[120px] text-center text-sm p-2 hover:bg-accent-1 hover:text-primary-1 transition-all"
      >
        Tambah Data
      </Link>

      <DataTableAdmin />
    </section>
  );
}
