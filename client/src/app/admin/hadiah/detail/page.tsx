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
      <div className=" pl-2 bg-white">
        <h2 className="text-2xl font-semibold mt-4">Informasi Admin</h2>
        <div className="w-full bg-[#F2F9FF] border border-[#3E82CD] p-4 rounded-xl mt-6 shadow-sm">
          <div className="divide-y divide-[#D0E3F6]">
            <div className="grid grid-cols-[auto_1fr] gap-x-4 py-2">
              <div className="text-base font-semibold">Nama:</div>
              <div className="text-base text-right">Pulsa Telkomsel 25k</div>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 py-2">
              <div className="text-base font-semibold">Deskripsi:</div>
              <div className="text-base text-right">Pulsa Telkomsel senilai Rp25.000</div>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 py-2">
              <div className="text-base font-semibold">Stok:</div>
              <div className="text-base text-right">10</div>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 py-2">
              <div className="text-base font-semibold">Harga Poin:</div>
              <div className="text-base text-right">500</div>
            </div>
          </div>
        </div>
      </div>
  );
}
