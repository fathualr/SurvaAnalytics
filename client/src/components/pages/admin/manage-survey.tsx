'use client';

import DataTableSurvey from "@/features/survey/components/admin/data-table";
import Link from "next/link";

export function ManageSurveyPage() {
  return (
    <section className="flex flex-col flex-grow text-primary-1 gap-5 font-semibold">
      <h1 className="text-3xl font-bold">Data Survey</h1>

      <Link
        href="/admin/manage-survey/add"
        className="rounded-md bg-primary-2 text-accent-1 border w-[120px] text-center text-sm p-2 hover:bg-accent-1 hover:text-primary-1 transition-all"
      >
        Tambah Data
      </Link>

      <DataTableSurvey />
    </section>
  );
}
