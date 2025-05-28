'use client'

import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type SurveyDialogProps = {
  judul: string
  deskripsi: string
  poin: number
}

export function SurveyDialog({ judul, deskripsi, poin }: SurveyDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-secondary-1 w-full sm:w-32 h-8 text-sm font-semibold hover:bg-secondary-2 text-primary-1 rounded-sm">
          Kerjakan
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl rounded-xl p-6 bg-primary-2 text-accent-1 border-none">
        <DialogTitle className="text-2xl font-semibold">
          {judul}
        </DialogTitle>
        <DialogDescription className="flex flex-col text-accent-1">
          <span className="block font-semibold">Deskripsi:</span>
          {deskripsi}
          <span className="mt-3 text-secondary-1 font-bold text-lg">{poin} Poin</span>
        </DialogDescription>
        <DialogFooter>
          <Button
            variant="outline"
            className="bg-accent-1 text-primary-2 font-bold text-lg px-6 py-2 rounded-md hover:bg-primary-2 hover:text-accent-1"
          >
            Mulai
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
