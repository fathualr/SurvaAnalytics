import { ManageUserEditPage } from '@/components/pages/admin/manage-user-edit';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Data - Edit Public`,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <ManageUserEditPage userId={id} />;
}
