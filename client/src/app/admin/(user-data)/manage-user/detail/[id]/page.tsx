import { ManageUserDetailPage } from '@/components/pages/admin/manage-user-detail';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ManageUserDetailPage userId={id} />;
}
