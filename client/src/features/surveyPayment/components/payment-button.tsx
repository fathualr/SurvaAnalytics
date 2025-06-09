'use client';

import { useCreateSurveyPayment } from '@/features/surveyPayment/hooks/useUserSurveyPayment';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Props {
  surveyId: string;
}

export const CreateSurveyPaymentButton = ({ surveyId }: Props) => {
  const { mutate, isPending } = useCreateSurveyPayment();

  const handleClick = () => {
    mutate(surveyId, {
      onSuccess: (payment) => {
        if (payment.invoice_url) {
          window.open(payment.invoice_url, '_blank');
        } else {
          toast('Tidak ada invoice URL.');
        }
      },
      onError: (error: any) => {
        toast(error?.message || 'Gagal membuat pembayaran.');
      },
    });
  };

  return (
    <Button
      className="bg-secondary-1 hover:bg-secondary-1 text-[#232323] font-semibold hover:opacity-80"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? 'Memproses...' : 'Bayar & Publish Survei'}
    </Button>
  );
};
