'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';
import { useResponseSurveySubmissionDraft } from '../hooks/useUserSurveyResponseSubmission';

interface StartSurveyButtonProps {
  surveiId: string;
  isOwner: boolean;
  isLoggedIn: boolean;
}

export function StartSurveyButton({
  surveiId,
  isOwner,
  isLoggedIn,
}: StartSurveyButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { data: draft, isLoading: draftLoading, refetch } = useResponseSurveySubmissionDraft(surveiId, false);

  const handleStart = async () => {
    if (!isLoggedIn) {
      router.push(`/login`);
      toast.error('Silakan login terlebih dahulu untuk mengikuti survei.');
    }

    if (isOwner) {
      toast.error('Kamu tidak bisa mengikuti survei milik sendiri.');
      return;
    }

    try {
      setLoading(true);

      const res = await refetch();
      if (!res?.data) {
        throw new Error('Gagal membuat atau mengambil draft survei');
      }

      toast.success('Memulai');
      router.push(`/survey/viewform/${surveiId}`);
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || '';
      toast.error(message || 'Gagal memulai survei.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleStart}
      className="bg-accent-1 text-primary-2 font-bold text-lg px-6 py-2 rounded-md hover:bg-primary-2 hover:text-accent-1"
      disabled={loading || draftLoading}
    >
      {loading ? 'Memulai...' : 'Mulai'}
    </Button>
  );
}

// test