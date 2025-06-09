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
    kontak: "0812345678911",
    jenisKelamin: "Laki laki",
  },
  {
    id: 2,
    nama: "Adji",
    email: "adji@gmail.com",
    kontak: "0812312743244",
    jenisKelamin: "Laki laki",
    
  },
  {
    id: 3,
    nama: "Mirza",
    email: "mirza@gmail.com",
    kontak: "0812945435855",
    jenisKelamin: "Laki laki",
    
  },
  {
    id: 4,
    nama: "Azis",
    email: "azis@gmail.com",
    kontak: "0811234834374",
    jenisKelamin: "Laki laki",
    
  },
  {
    id: 5,
    nama: "Rojik",
    email: "rojik@gmail.com",
    kontak: "0829475321345",
    jenisKelamin: "Laki laki",
    
  },
  {
    id: 6,
    nama: "Satria",
    email: "satria@gmail.com",
    kontak: "0838274285525",
    jenisKelamin: "Laki laki",
    
  },
  {
    id: 7,
    nama: "Aidan",
    email: "Aidan@gmail.com",
    kontak: "0884234234532",
    jenisKelamin: "Laki laki",
    
  },
  {
    id: 8,
    nama: "Abdul",
    email: "abdul@gmail.com",
    kontak: "0842342456843",
    jenisKelamin: "Laki laki",
    
  },

];
export default function EditPage() {
  return (
      <div className=" pl-2 bg-white">
        <h2 className="text-2xl font-semibold">Data Admin</h2>
            <div className="flex flex-col mt-2">
                <Input className="w-64 border-black border-1" placeholder="Cari Admin"></Input>
            </div>
              <Table className="mt-8 bg-[#E5F1FF] rounded-tr-2xl rounded-tl-2xl hover:[#E5F1FF]">
              <TableHeader className="bg-[#3984EF] ">
                <TableRow className="hover:bg-[#3984EF] ">
                  <TableHead className="w-[50px] text-white rounded-tl-2xl">No</TableHead>
                  <TableHead className="text-white">Nama</TableHead>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-white">Kontak</TableHead>
                  <TableHead className="text-white rounded-tr-2xl">Detail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody >
                {dataKlien.map((klien, index) => (
                  <TableRow key={klien.id}>
                    <TableCell className="border-black border-b-2 border-t-2">{index + 1}</TableCell>
                    <TableCell className="border-black border-b-2 border-t-2">{klien.nama}</TableCell>
                    <TableCell className="border-black border-b-2 border-t-2">{klien.email}</TableCell>
                    <TableCell className="border-black border-b-2 border-t-2">{klien.kontak}</TableCell>
                    <TableCell className="border-black border-b-2 border-t-2 ">
                      <Link href="/admin/admin/detail">
                      <Button className="p-2 rounded-md bg-blue-200 hover:bg-blue-200 transition-transform hover:scale-105 active:scale-95" title="Lihat detail klien" >
                        <Image src="/detail.svg" alt="Detail" width={15} height={15} priority />
                      </Button>
                      </Link>
                      <Link href='/admin/admin/edit'>
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
