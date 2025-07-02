import { ManageVerificationReviewPage } from '@/components/pages/admin/manage-verification-review';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Data - Review Survey`,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <ManageVerificationReviewPage surveyId={id} />;
}
