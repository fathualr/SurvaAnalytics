'use client';

import { FormAddAdmin } from "@/features/user/components/data-admin/form-add";

export function ManageAdminAddPage() {
  return (
    <section className="flex flex-col flex-grow text-primary-1 gap-5 font-semibold">
      <h1 className="text-3xl font-bold">Data Pengguna - Admin</h1>

      <FormAddAdmin />

    </section>
  );
}
