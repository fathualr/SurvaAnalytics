'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface SurveyDialogProps {
  judul: string;
  deskripsi?: string;
  hadiah_poin: string;
  Umum?: {
    nama: string;
    [key: string]: any;
  };
  kriteria: Record<string, any>;
  tanggal_mulai: string;
  tanggal_berakhir: string;
}

export function SurveyDialog({
  judul,
  deskripsi,
  hadiah_poin,
  Umum,
  kriteria,
  tanggal_mulai,
  tanggal_berakhir,
}: SurveyDialogProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

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
        <DialogHeader className="gap-0">
          <DialogTitle className="text-2xl text-accent-1 font-semibold">
            {judul}
          </DialogTitle>
          <DialogDescription className="text-sm text-secondary-1 font-semibold space-y-3">
            <span className="block">
              Dibuat oleh: <span className="font-bold">{Umum?.nama || '-'}</span>
            </span>
            <span className="block">
              Hadiah: <span className="font-bold">{hadiah_poin} poin</span>
            </span>
            <span className="block">
              Periode: <span className="font-bold">{formatDate(tanggal_mulai)} – {formatDate(tanggal_berakhir)}</span>
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="text-sm text-accent-1 whitespace-pre-line mt-3">
          {deskripsi || '-'}
        </div>

        {Object.keys(kriteria).length > 0 && (
          <div className="mt-4 text-sm text-accent-1">
            <h3 className="font-semibold mb-2">Kriteria:</h3>
            <ul className="list-disc list-inside space-y-1">
              {Object.entries(kriteria).map(([key, value]) => (
                <li key={key}>
                  <span className="capitalize">{key}</span>: {String(value)}
                </li>
              ))}
            </ul>
          </div>
        )}

        <DialogFooter className="mt-4">
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
}
