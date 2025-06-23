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

interface ConfirmDialogProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actionLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  actionClassName?: string;
}

export function ConfirmDialog({
  children,
  title = 'Konfirmasi Tindakan',
  description = 'Tindakan ini tidak dapat dibatalkan.',
  actionLabel = 'Lanjut',
  isLoading = false,
  onConfirm,
  actionClassName = '',
}: ConfirmDialogProps) {
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
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className={`cursor-pointer ${actionClassName}`}
          >
            {isLoading ? 'Memproses...' : actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
