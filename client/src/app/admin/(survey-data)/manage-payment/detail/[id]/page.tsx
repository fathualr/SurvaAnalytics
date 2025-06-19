import { ManagePaymentDetailPage } from '@/components/pages/admin/manage-payment-detail';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ManagePaymentDetailPage paymentId={id} />;
}
