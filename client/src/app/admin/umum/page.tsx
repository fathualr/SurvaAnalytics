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

const dataKlien = [
  {
    id: 1,
    nama: "Fathu",
    email: "fathu@gmail.com",
    tanggalLahir: "10-10-2004",
    jenisKelamin: "Laki laki",
  },
  {
    id: 2,
    nama: "Adji",
    email: "adji@gmail.com",
    tanggalLahir: "12-12-2003",
    jenisKelamin: "Laki laki",
    
  },
  {
    id: 3,
    nama: "Mirza",
    email: "mirza@gmail.com",
    tanggalLahir: "05-05-2005",
    jenisKelamin: "Laki laki",
    
  },
  {
    id: 4,
    nama: "Azis",
    email: "azis@gmail.com",
    tanggalLahir: "06-06-2006",
    jenisKelamin: "Laki laki",
    
  },
  {
    id: 5,
    nama: "Rojik",
    email: "rojik@gmail.com",
    tanggalLahir: "08-08-2007",
    jenisKelamin: "Laki laki",
    
  },
  {
    id: 6,
    nama: "Satria",
    email: "satria@gmail.com",
    tanggalLahir: "02-02-2002",
    jenisKelamin: "Laki laki",
    
  },
  {
    id: 7,
    nama: "Aidan",
    email: "Aidan@gmail.com",
    tanggalLahir: "01-01-2001",
    jenisKelamin: "Laki laki",
    
  },
  {
    id: 8,
    nama: "Abdul",
    email: "abdul@gmail.com",
    tanggalLahir: "03-03-2003",
    jenisKelamin: "Laki laki",
    
  },

];
export default function UmumPage() {
  return (
      <div className=" pl-2 bg-white">
        <h2 className="text-2xl font-semibold mt-4">Data Pengguna Umum</h2>
            <div className="flex flex-col mt-2">
                <Input className="w-64 border-black border-1" placeholder="Cari Pengguna"></Input>
            </div>
              <Table className="mt-8 bg-[#E5F1FF] rounded-tr-2xl rounded-tl-2xl hover:[#E5F1FF]">
              <TableHeader className="bg-[#3984EF] ">
                <TableRow className="hover:bg-[#3984EF] ">
                  <TableHead className="w-[50px] text-white rounded-tl-2xl">No</TableHead>
                  <TableHead className="text-white">Nama</TableHead>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-white">Tanggal Lahir</TableHead>
                  <TableHead className="text-white">Jenis Kelamin</TableHead>
                  <TableHead className="text-white rounded-tr-2xl">Detail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody >
                {dataKlien.map((klien, index) => (
                  <TableRow key={klien.id}>
                    <TableCell className="border-black border-b-2 border-t-2">{index + 1}</TableCell>
                    <TableCell className="border-black border-b-2 border-t-2">{klien.nama}</TableCell>
                    <TableCell className="border-black border-b-2 border-t-2">{klien.email}</TableCell>
                    <TableCell className="border-black border-b-2 border-t-2">{klien.tanggalLahir}</TableCell>
                    <TableCell className="border-black border-b-2 border-t-2">{klien.jenisKelamin}</TableCell>
                    <TableCell className="border-black border-b-2 border-t-2 ">
                      <Link href="/admin/umum/detail">
                      <Button className="p-2 rounded-md bg-blue-200 hover:bg-blue-200 transition-transform hover:scale-105 active:scale-95" title="Lihat detail klien" >
                        <Image src="/detail.svg" alt="Detail" width={15} height={15} priority />
                      </Button>
                      </Link>
                      <Link href='/admin/umum/edit'>
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
