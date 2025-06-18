import { ManageAdminDetailPage } from '@/components/pages/admin/manage-admin-detail';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ManageAdminDetailPage userId={id} />;
}
