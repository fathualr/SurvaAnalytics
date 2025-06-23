'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CircleCheck } from 'lucide-react';

interface SurveyFinishScreenProps {
  points: string;
}

export function FinishedSurvey({ points }: SurveyFinishScreenProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-grow items-center justify-center">
      <CircleCheck className="w-16 h-16 text-green-600 mb-4" />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Terima kasih!</h1>
      <p className="text-gray-600 mb-4">
        Partisipasimu telah berhasil dikirim.
      </p>
      <p className="text-lg font-semibold text-primary-2 mb-6">
        Kamu mendapatkan <span className="text-green-600">{points}</span> poin!
      </p>
      <Button
        onClick={() => router.push('/explore')}
        className="bg-primary-2 hover:bg-primary-2/80 text-white px-6 py-2 rounded-md"
      >
        Kembali
      </Button>
    </div>
  );
}
