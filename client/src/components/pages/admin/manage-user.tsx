'use client';

import DataTableUser from "@/features/user/components/data-umum/data-table";

export function ManageUserPage() {
  return (
    <section className="flex flex-col flex-grow text-primary-1 gap-3 font-semibold">
      <h1 className="text-3xl font-bold">Data Pengguna - Umum</h1>

      <DataTableUser />
    </section>
  );
}
