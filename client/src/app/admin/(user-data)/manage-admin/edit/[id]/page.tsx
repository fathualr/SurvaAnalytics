import { ManageAdminEditPage } from '@/components/pages/admin/manage-admin-edit';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Data - Edit Admin`,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <ManageAdminEditPage userId={id} />;
}
