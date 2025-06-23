'use client';

import { FormEditAdmin } from "@/features/user/components/data-admin/form-edit";

interface ManageAdminEditPageProps {
  userId: string;
}

export function ManageAdminEditPage({ userId }: ManageAdminEditPageProps) {
  return (
    <section className="flex flex-col flex-grow text-primary-1 font-semibold">
      <h1 className="text-3xl font-bold">Data Pengguna - Admin</h1>
      <span className="block text-sm text-muted-foreground mb-5">Id: {userId}</span>

      <FormEditAdmin userId={userId} />
    </section>
  );
}
