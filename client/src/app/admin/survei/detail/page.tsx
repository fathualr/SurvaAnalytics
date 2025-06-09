import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function DetailPage() {
  return (
    <div className="pl-2 bg-white">
      <h2 className="text-2xl font-semibold mt-4">Informasi Survei</h2>
      <div className="w-full bg-[#F2F9FF] border border-[#3E82CD] p-4 rounded-xl mt-6 shadow-sm">
        <div className="divide-y divide-[#D0E3F6]">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 py-2">
            <div className="text-base font-semibold">Judul:</div>
            <div className="text-base text-right">Survei Kepuasan Pengguna Aplikasi</div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 py-2">
            <div className="text-base font-semibold">Deskripsi:</div>
            <div className="text-base text-right">
              Survei untuk mengetahui tingkat kepuasan pengguna terhadap fitur dan performa aplikasi.
            </div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 py-2">
            <div className="text-base font-semibold">Status:</div>
            <div className="text-base text-right">Published</div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 py-2">
            <div className="text-base font-semibold">Kriteria:</div>
            <div className="text-base text-right">Mahasiswa</div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 py-2">
            <div className="text-base font-semibold">Jumlah Responden:</div>
            <div className="text-base text-right">50 </div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 py-2">
            <div className="text-base font-semibold">Hadiah Poin:</div>
            <div className="text-base text-right">20</div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 py-2">
            <div className="text-base font-semibold">Tanggal Mulai:</div>
            <div className="text-base text-right">10-01-2024</div>
          </div>
        </div>
      </div>
    </div>
  );
}
