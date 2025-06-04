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


const dataKlien = [
  {
    id: 1,
    judul: "Survei Kepuasan Pengguna",
    deskripsi: "lorem ipsum ip dolor amet,",
    tanggalpembuatan: "10-10-2004",
  },
  {
    id: 2,
    judul: "Survei Prototype Aplikasi",
    deskripsi: "lorem ipsum ip dolor amet,",
    tanggalpembuatan: "12-12-2003",
    
  },
  {
    id: 3,
    judul: "Survei Penilaian Kinerja",
    deskripsi: "lorem ipsum ip dolor amet,",
    tanggalpembuatan: "05-05-2005",
    
  },
  {
    id: 4,
    judul: "Survei Kepuasan Fasilitas Umum",
    deskripsi: "lorem ipsum ip dolor amet,",
    tanggalpembuatan: "06-06-2006",
    
  },


];
export default function DetailPage() {
  return (
      <div className=" pl-2 bg-white">
        <h2 className="text-2xl mt-4 font-semibold">Informasi Pengguna </h2>
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
              <div className="text-base font-semibold">Tanggal Lahir:</div>
              <div className="text-base text-right">10/10/2010</div>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 py-2">
              <div className="text-base font-semibold">Jenis Kelamin:</div>
              <div className="text-base text-right">Laki laki</div>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 py-2">
              <div className="text-base font-semibold">Asal Domisili:</div>
              <div className="text-base text-right">Batam</div>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 py-2">
              <div className="text-base font-semibold">Status Anda:</div>
              <div className="text-base text-right">Mahasiswa</div>
            </div>
          </div>
        </div>

              <Table className="mt-8 bg-[#E5F1FF] rounded-tr-2xl rounded-tl-2xl hover:[#E5F1FF]">
              <TableHeader className="bg-[#3984EF] ">
                <TableRow className="hover:bg-[#3984EF] ">
                  <TableHead className="w-[20px] text-white rounded-tl-2xl">No</TableHead>
                  <TableHead className="text-white ">Judul</TableHead>
                  <TableHead className="text-white">Deskripsi</TableHead>
                  <TableHead className="text-white rounded-tr-2xl">Tanggal Lahir</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody >
                {dataKlien.map((klien, index) => (
                  <TableRow key={klien.id}>
                    <TableCell className="border-black border-b-2 border-t-2 ">{index + 1}</TableCell>
                    <TableCell className="border-black border-b-2 border-t-2 ">{klien.judul}</TableCell>
                    <TableCell className="border-black border-b-2 border-t-2 ">{klien.deskripsi}</TableCell>
                    <TableCell className="border-black border-b-2 border-t-2 ">{klien.tanggalpembuatan}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
      </div>

  );
}
