import { Component } from "@/components/ui/dashboard-chart";
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
        <h2 className="text-2xl font-semibold">Informasi Admin</h2>
        <div className="w-full bg-[#F2F9FF] border border-[#3E82CD] p-4 rounded-xl mt-6 shadow-sm">
          <div className="divide-y divide-[#D0E3F6]">
            <div className="grid grid-cols-[auto_1fr] gap-x-4 py-2">
              <div className="text-base font-semibold">Nama:</div>
              <div className="text-base text-right">Abdul micro</div>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 py-2">
              <div className="text-base font-semibold">Email:</div>
              <div className="text-base text-right">abdul@gmail.com</div>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 py-2">
              <div className="text-base font-semibold">Kontak:</div>
              <div className="text-base text-right">081234567891</div>
            </div>
          </div>
        </div>
      </div>
  );
}
