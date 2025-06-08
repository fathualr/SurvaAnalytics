import { useUserSubmitSurveyVerification } from '@/features/surveyVerification/hooks/useUserSurveyVerification';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/umum/confirm-dialog';

const SubmitButton = ({ surveiId }: { surveiId: string }) => {
  const { mutate, isPending } = useUserSubmitSurveyVerification(surveiId);

  return (
    <ConfirmDialog
      title="Ajukan Verifikasi Survei?"
      description="Setelah diajukan, kamu tidak bisa mengedit survei ini. Pastikan semua data sudah benar."
      actionLabel="Yakin & Kirim"
      isLoading={isPending}
      onConfirm={() => mutate(surveiId)}
      actionClassName="bg-primary-2/80 hover:bg-primary-1"
    >
      <Button
        className="bg-primary-2/80 hover:bg-primary-1 font-semibold hover:opacity-80"
        disabled={isPending}
      >
        {isPending ? 'Mengirim...' : 'Submit & Verifikasi'}
      </Button>
    </ConfirmDialog>
  );
};

export default SubmitButton;
