import { ManageAdminEditPage } from '@/components/pages/admin/manage-admin-edit';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ManageAdminEditPage userId={id} />;
}
