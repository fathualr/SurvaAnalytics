import { ManageVerificationReviewPage } from '@/components/pages/admin/manage-verification-review';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ManageVerificationReviewPage surveyId={id} />;
}
