import { ManageRewardEditPage } from '@/components/pages/admin/manage-reward-edit';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ManageRewardEditPage rewardId={id} />;
}
