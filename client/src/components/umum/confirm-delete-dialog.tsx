'use client';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

interface ConfirmDeleteDialogProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actionLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
}

export function ConfirmDeleteDialog({
  children,
  title = 'Hapus Item',
  description = 'Tindakan ini tidak dapat dibatalkan.',
  actionLabel = 'Ya, Hapus',
  isLoading = false,
  onConfirm,
}: ConfirmDeleteDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Batal</AlertDialogCancel>
          <AlertDialogAction className="bg-red-400 hover:bg-red-600 cursor-pointer" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Menghapus...' : actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
