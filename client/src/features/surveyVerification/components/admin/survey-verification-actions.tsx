"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useVerifySurveiByAdmin } from "../../hooks/useAdminSurveyVerification"
import { useRouter } from "next/navigation";

interface Props {
  surveyId: string
}

export const SurveyVerificationActions = ({ surveyId }: Props) => {
  const [openReject, setOpenReject] = useState(false)
  const [openAccept, setOpenAccept] = useState(false)
  const [umpanBalik, setUmpanBalik] = useState("")
  const router = useRouter();

  const { mutate: verifySurvei, isPending } = useVerifySurveiByAdmin()


  const handleApprove = () => {
    verifySurvei(
      {
        id: surveyId,
        payload: { approve: true },
      },
      {
        onSuccess: () => {
          toast.success("Survei telah disetujui");
          setOpenAccept(false);
          router.push("/admin/manage-verification");
        },
        onError: () => toast.error("Gagal menyetujui survei"),
      }
    );
  };

  const handleReject = () => {
    if (!umpanBalik.trim()) {
      toast.error("Umpan balik penolakan harus diisi");
      return;
    }

    verifySurvei(
      {
        id: surveyId,
        payload: {
          approve: false,
          umpan_balik: umpanBalik,
        },
      },
      {
        onSuccess: () => {
          toast.success("Survei ditolak");
          setOpenReject(false);
          setUmpanBalik("");
          router.push("/admin/manage-verification");
        },
        onError: () => toast.error("Gagal menolak survei"),
      }
    );
  };

  return (
    <div className="flex gap-2 mt-4">
      <AlertDialog open={openAccept} onOpenChange={setOpenAccept}>
        <AlertDialogTrigger asChild>
          <Button className="w-28 bg-green-100 text-green-700 hover:bg-green-200">Terima</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Terima survei ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Survei akan disetujui dan dapat dipublikasikan oleh pengguna.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleApprove} className="bg-green-100 text-green-700 hover:bg-green-200" disabled={isPending}>
              Ya, Terima
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={openReject} onOpenChange={setOpenReject}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-28 bg-red-400 hover:bg-red-500">Tolak</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tolak survei ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Berikan umpan balik penolakan untuk dikirimkan ke pengguna.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <textarea
            value={umpanBalik}
            onChange={(e) => setUmpanBalik(e.target.value)}
            placeholder="Tuliskan alasan penolakan..."
            rows={4}
            required
            className="w-full border rounded-md p-2 text-sm"
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleReject} className="bg-red-400 hover:bg-red-500" disabled={isPending}>
              Kirim Penolakan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
