'use client';

import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface SurveyDialogProps {
  judul: string;
  deskripsi?: string;
  poin: string;
}

const SurveyDialog = ({ judul, deskripsi, poin }: SurveyDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-secondary-1 w-full sm:w-32 md:text-md text-sm font-semibold hover:bg-secondary-2 text-primary-1 rounded-sm"
        >
          Lihat Detail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl rounded-xl p-6 bg-primary-2 border-none">
        <DialogHeader className='gap-0'>
          <DialogTitle className="text-2xl text-accent-1 font-semibold">
            {judul}
          </DialogTitle>
          <DialogDescription className="text-sm text-secondary-1 font-semibold">
            Hadiah: <span className='font-bold'>{poin} poin</span>
          </DialogDescription>
        </DialogHeader>
          <div className="text-sm text-accent-1 whitespace-pre-line">
            {deskripsi || '-'}
          </div>
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
  );
};

export default SurveyDialog;
