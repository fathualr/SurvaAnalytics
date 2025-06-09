'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useCreateUserSurvey } from '@/features/survey/hooks/useUserSurveys';
import { defaultSurveyPayload } from '../../constants';
import { toast } from "sonner";

export const NewSurveyCard = () => {
  const router = useRouter();
  const createSurvey = useCreateUserSurvey();

  const handleClick = async () => {
    const toastId = toast.loading("Membuat survei...");
    try {
      const result = await createSurvey.mutateAsync(defaultSurveyPayload);
      toast.success("Survei berhasil dibuat!", { id: toastId });
      router.push(`/manage-survey/edit/${result.id}`);
    } catch (err) {
      toast.error("Gagal membuat survei", { id: toastId });
    }
  };

  return (
    <Card
      onClick={handleClick}
      className="overflow-hidden flex flex-col h-[220px] gap-0 p-0 shadow bg-accent-1 rounded-xl hover:opacity-75 transition cursor-pointer"
    >
      <div className="flex-grow flex items-center justify-center bg-primary-2">
        <Plus className="w-40 h-40 text-accent-1 opacity-75" />
      </div>
      <CardContent className="p-0">
        <div className="h-14 bg-primary-1 text-accent-1 p-3 flex items-center justify-center rounded-t-none">
          <span className="text-lg font-semibold">Survei baru</span>
        </div>
      </CardContent>
    </Card>
  );
};