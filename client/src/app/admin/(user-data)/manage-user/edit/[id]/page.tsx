import { ManageUserEditPage } from '@/components/pages/admin/manage-user-edit';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ManageUserEditPage userId={id} />;
}
