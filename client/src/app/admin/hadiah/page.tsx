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
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import Link from "next/link";

const datahadiah = [
  {
    id: 1,
    nama: "Pulsa Telkomsel 25k",
    deskripsi: "Pulsa Telkomsel senilai Rp25.000",
    stok: "10",
    hargapoin: "500",
  },
  {
    id: 2,
    nama: "Pulsa Indosat 20k",
    deskripsi: "Pulsa Indosat senilai Rp20.000",
    stok: "15",
    hargapoin: "400",
  },
  {
    id: 3,
    nama: "Pulsa XL 15k",
    deskripsi: "Pulsa XL Axiata senilai Rp15.000",
    stok: "20",
    hargapoin: "350",
  },
  {
    id: 4,
    nama: "Voucher Alfamart 10k",
    deskripsi: "Voucher belanja Alfamart senilai Rp10.000",
    stok: "10",
    hargapoin: "300",
  },
  {
    id: 5,
    nama: "Voucher Indomaret 15k",
    deskripsi: "Voucher belanja Indomaret senilai Rp15.000",
    stok: "15",
    hargapoin: "350",
  },
  {
    id: 6,
    nama: "E-Wallet OVO 20k",
    deskripsi: "Saldo OVO senilai Rp20.000",
    stok: "20",
    hargapoin: "400",
  },
  {
    id: 7,
    nama: "E-Wallet DANA 25k",
    deskripsi: "Saldo DANA senilai Rp25.000",
    stok: "15",
    hargapoin: "450",
  },
  {
    id: 8,
    nama: "Voucher GrabFood 25k",
    deskripsi: "Voucher makan GrabFood senilai Rp25.000",
    stok: "20",
    hargapoin: "500",
  },
];

export default function HadiahPage() {
  return (
      <div className=" pl-2 bg-white">
        <h2 className="text-2xl font-semibold">Data Hadiah</h2>
            <div className="flex flex-col mt-2">
                <Input className="w-64 border-black border-1" placeholder="Cari Hadiah"></Input>
            </div>
              <Table className="mt-8 bg-[#E5F1FF] rounded-tr-2xl rounded-tl-2xl hover:[#E5F1FF]">
              <TableHeader className="bg-[#3984EF] ">
                <TableRow className="hover:bg-[#3984EF] ">
                  <TableHead className="w-[50px] text-white rounded-tl-2xl">No</TableHead>
                  <TableHead className="text-white">Nama</TableHead>
                  <TableHead className="text-white">Deskripsi</TableHead>
                  <TableHead className="text-white">Stok</TableHead>
                  <TableHead className="text-white">Harga Poin</TableHead>
                  <TableHead className="text-white rounded-tr-2xl">Detail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody >
                {datahadiah.map((klien, index) => (
                  <TableRow key={klien.id}>
                    <TableCell className="border-black border-b-2 border-t-2">{index + 1}</TableCell>
                    <TableCell className="border-black border-b-2 border-t-2">{klien.nama}</TableCell>
                    <TableCell className="border-black border-b-2 border-t-2">{klien.deskripsi}</TableCell>
                    <TableCell className="border-black border-b-2 border-t-2">{klien.stok}</TableCell>
                    <TableCell className="border-black border-b-2 border-t-2">{klien.hargapoin}</TableCell>
                    <TableCell className="border-black border-b-2 border-t-2 ">
                      <Link href="/admin/hadiah/detail">
                      <Button className="p-2 rounded-md bg-blue-200 hover:bg-blue-200 transition-transform hover:scale-105 active:scale-95" title="Lihat detail klien" >
                        <Image src="/detail.svg" alt="Detail" width={15} height={15} priority />
                      </Button>
                      </Link>
                      <Link href='/admin/hadiah/edit'>
                      <Button className="ml-2 p-2 rounded-md bg-yellow-200 hover:bg-yellow-200 transition-transform hover:scale-105 active:scale-95" title="Edit klien">
                        <Image src="/edit.svg" alt="Edit" width={15} height={15} priority />
                      </Button>
                      </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
          
                      <Button className="p-2 ml-2 rounded-md bg-red-200 hover:bg-red-200 transition-transform hover:scale-105 active:scale-95" title="Hapus klien">
                        <Image src="/delete.svg" alt="Delete" width={15} height={15} priority />
                      </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Hapus Klien</AlertDialogTitle>
                        </AlertDialogHeader >
                        <p>Apakah Anda yakin ingin menghapus data klien dengan ID 1</p>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction asChild>
                            <Button type="submit" className="bg-red-400 hover:opacity-60  text-white px-4 py-2 rounded-md ">
                              Hapus
                            </Button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-10 ">
              <div className="w-20"></div> 
              <div className="text-center font-semibold">1</div>
              <Button className="bg-[#FFBF68] hover:opacity-60 hover:bg-[#FFBF68] text-white px-4 py-1 rounded-md font-semibold  w-24 transition cursor-pointer">
                Next
              </Button>
            </div>
      </div>

  );
}
