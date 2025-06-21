"use client"

import { useState } from "react"
import { Trash } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
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
} from "@/components/ui/alert-dialog"
import { useAdminDeleteHadiah } from "../../hooks/useAdminReward"

interface ButtonDeleteHadiahProps {
  hadiahId: string
  onSuccess?: () => void
}

export const ButtonDeleteHadiah = ({
  hadiahId,
  onSuccess,
}: ButtonDeleteHadiahProps) => {
  const [open, setOpen] = useState(false)
  const { mutateAsync: deleteHadiah, isPending } = useAdminDeleteHadiah()

  const handleDelete = async () => {
    try {
      await deleteHadiah(hadiahId)
      toast.success("Hadiah berhasil dihapus")
      setOpen(false)
      onSuccess?.()
    } catch (err: any) {
      toast.error(err?.message || "Gagal menghapus hadiah")
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Trash className="w-4 h-4 text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Hadiah</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah kamu yakin ingin menghapus hadiah ini? Tindakan ini tidak dapat dibatalkan.
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
  )
}
