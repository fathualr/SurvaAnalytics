'use client';

import { FormAddUmum } from "@/features/user/components/data-umum/form-add";

export function ManageUserAddPage() {
  return (
    <section className="flex flex-col flex-grow text-primary-1 gap-5 font-semibold">
      <h1 className="text-3xl font-bold">Data Pengguna - Umum</h1>

      <FormAddUmum />

    </section>
  );
}
