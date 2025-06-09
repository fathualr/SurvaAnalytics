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
import Link from "next/link";

export default function DetailPage() {
  return (
    <div className="pl-2 bg-white">
      <h2 className="text-2xl font-semibold mt-4">Informasi Konfigurasi Harga</h2>
      <div className="w-full bg-[#F2F9FF] border border-[#3E82CD] p-4 rounded-xl mt-6 shadow-sm">
        <div className="divide-y divide-[#D0E3F6]">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 py-2">
            <div className="text-base font-semibold">Harga Dasar:</div>
            <div className="text-base text-right">Rp.15.000</div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 py-2">
            <div className="text-base font-semibold">Harga per Pertanyaan:</div>
            <div className="text-base text-right">Rp.10.000</div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 py-2">
            <div className="text-base font-semibold">Harga per Responden:</div>
            <div className="text-base text-right">Rp.200</div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 py-2">
            <div className="text-base font-semibold">Harga per Durasi:</div>
            <div className="text-base text-right">Rp.5.000</div>
          </div>
          <div className="flex justify-end mt-4 ">
           <Link href="/admin/konfigurasi-harga/edit">
          <Button className="w-20 bg-[#FFBF68] text-white hover:opacity-60 hover:bg-[#FFBF68]">
            Edit
          </Button>
          </Link>
           </div>
        
        </div>
      </div>
    </div>
  );
}
