'use client';

import DataTableSurveyPayment from "@/features/surveyPayment/components/admin/data-table";

export function ManagePaymentPage() {
  return (
    <section className="flex flex-col flex-grow text-primary-1 gap-5 font-semibold">
      <h1 className="text-3xl font-bold">Data Pembayaran Survei</h1>

      <DataTableSurveyPayment />
    </section>
  );
}
