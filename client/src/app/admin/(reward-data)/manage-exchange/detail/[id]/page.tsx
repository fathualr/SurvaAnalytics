import { ManageRewardExchangeDetailPage } from '@/components/pages/admin/manage-exchange-detail';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Data - Detail Exchange`,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <ManageRewardExchangeDetailPage rewardExchangeId={id} />;
}
