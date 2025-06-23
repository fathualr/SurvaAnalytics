'use client';

import { FormDetailSurveyPayment } from "@/features/surveyPayment/components/admin/form-detail";

interface ManagePaymentDetailPageProps {
  paymentId: string;
}

export function ManagePaymentDetailPage({ paymentId }: ManagePaymentDetailPageProps) {
  return (
    <section className="flex flex-col flex-grow text-primary-1 font-semibold">
      <h1 className="text-3xl font-bold">Data Pembayaran Survey</h1>
      <span className="block text-sm text-muted-foreground mb-5">Id: {paymentId}</span>

      <FormDetailSurveyPayment paymentId={paymentId} />
    </section>
  );
}
