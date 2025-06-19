'use client';

import DataTableVerification from "@/features/surveyVerification/components/admin/data-table";

export function ManageVerificationPage() {
  return (
    <section className="flex flex-col flex-grow text-primary-1 gap-5 font-semibold">
      <h1 className="text-3xl font-bold">Data Verifikasi Survei</h1>

      <DataTableVerification />
    </section>
  );
}
