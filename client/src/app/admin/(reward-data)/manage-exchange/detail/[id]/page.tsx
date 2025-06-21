import { ManageRewardExchangeDetailPage } from '@/components/pages/admin/manage-exchange-detail';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ManageRewardExchangeDetailPage rewardExchangeId={id} />;
}
