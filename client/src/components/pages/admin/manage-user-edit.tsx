'use client';

import { FormEditUmum } from "@/features/user/components/data-umum/form-edit";

interface ManageUserEditPageProps {
  userId: string;
}

export function ManageUserEditPage({ userId }: ManageUserEditPageProps) {
  return (
    <section className="flex flex-col flex-grow text-primary-1 font-semibold">
      <h1 className="text-3xl font-bold">Data Pengguna - Umum</h1>
      <span className="block text-sm text-muted-foreground mb-5">Id: {userId}</span>

      <FormEditUmum userId={userId} />
    </section>
  );
}
