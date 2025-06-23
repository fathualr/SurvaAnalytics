"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/alert-dialog";
import { useAdminDeleteRewardExchange } from "../../hooks/useAdminRewardExchange";

interface ButtonDeleteRewardExchangeProps {
  rewardExchangeId: string;
  onSuccess?: () => void;
}

export const ButtonDeleteRewardExchange = ({
  rewardExchangeId,
  onSuccess,
}: ButtonDeleteRewardExchangeProps) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: deleteRewardExchange, isPending } =
    useAdminDeleteRewardExchange();

  const handleDelete = async () => {
    try {
      await deleteRewardExchange(rewardExchangeId);
      toast.success("Penukaran hadiah berhasil dihapus");
      setOpen(false);
      onSuccess?.();
    } catch (err: any) {
      toast.error(err?.message || "Gagal menghapus penukaran hadiah");
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
          <AlertDialogTitle>Hapus Penukaran Hadiah</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah kamu yakin ingin menghapus penukaran hadiah ini? Tindakan
            ini tidak dapat dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isPending ? "Menghapus..." : "Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
