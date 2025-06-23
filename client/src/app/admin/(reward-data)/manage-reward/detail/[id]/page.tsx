import { ManageRewardDetailPage } from '@/components/pages/admin/manage-reward-detail';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ManageRewardDetailPage rewardId={id} />;
}
