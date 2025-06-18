'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useDeleteAdminSurvey } from '../../hooks/useAdminSurveys';
import { Trash } from 'lucide-react';

interface ButtonDeleteSurveyProps {
  surveyId: string;
  onSuccess?: () => void;
}

export const ButtonDeleteSurvey = ({
  surveyId,
  onSuccess,
}: ButtonDeleteSurveyProps) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: deleteSurvey, isPending } = useDeleteAdminSurvey();

  const handleDelete = async () => {
    try {
      await deleteSurvey(surveyId);
      toast.success('Survei berhasil dihapus');
      setOpen(false);
      onSuccess?.();
    } catch (err: any) {
      toast.error(err?.message || 'Gagal menghapus survei');
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Trash className="w-4 h-4 text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Survei</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah kamu yakin ingin menghapus survei ini? Tindakan ini tidak
            dapat dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isPending ? 'Menghapus...' : 'Hapus'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
