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

const datasurvei = [
  {
    id: 1,
    judul: "Survei Kepuasan Pengguna Aplikasi",
    deskripsi: "Survei untuk mengetahui tingkat kepuasan pengguna terhadap fitur dan performa aplikasi.",
    status: "draft",
    tanggalmulai: "10-01-2024",
  },
  {
    id: 2,
    judul: "Survei Pengalaman Belanja Elektronik",
    deskripsi: "Mengukur kepuasan pelanggan setelah berbelanja di toko elektronik secara offline maupun online.",
    status: "under_review",
    tanggalmulai: "15-02-2024",
  },
  {
    id: 3,
    judul: "Survei Efektivitas Iklan Digital",
    deskripsi: "Evaluasi terhadap seberapa efektif iklan digital menjangkau target audiens.",
    status: "payment_pending",
    tanggalmulai: "20-03-2024",
  },
  {
    id: 4,
    judul: "Survei Kepuasan Mahasiswa",
    deskripsi: "Menilai kepuasan mahasiswa terhadap pelayanan akademik dan fasilitas kampus.",
    status: "published",
    tanggalmulai: "05-04-2024",
  },
  {
    id: 5,
    judul: "Survei Lingkungan Bersih",
    deskripsi: "Mengetahui persepsi dan partisipasi masyarakat terhadap program kebersihan lingkungan.",
    status: "closed",
    tanggalmulai: "01-05-2024",
  },
  {
    id: 6,
    judul: "Survei Minat Baca Anak",
    deskripsi: "Mengukur tingkat minat baca siswa sekolah dasar dan faktor pendukungnya.",
    status: "archived",
    tanggalmulai: "12-06-2024",
  },
  {
    id: 7,
    judul: "Survei Layanan Rumah Sakit",
    deskripsi: "Menilai kualitas layanan medis dan non-medis dari rumah sakit umum daerah.",
    status: "rejected",
    tanggalmulai: "03-07-2024",
  },
  {
    id: 8,
    judul: "Survei Pengguna Layanan Antar Makanan",
    deskripsi: "Evaluasi kepuasan pelanggan terhadap layanan pengiriman makanan online.",
    status: "published",
    tanggalmulai: "18-08-2024",
  },
];

export default function S() {
  return (
      <div className=" pl-2 bg-white">
        <h2 className="text-2xl font-semibold mt-4">Data Survei</h2>
            <div className="flex flex-col mt-2">
                <Input className="w-64 border-black border-1" placeholder="Cari Survei"></Input>
            </div>
              <Table className="mt-8 bg-[#E5F1FF] rounded-tr-2xl rounded-tl-2xl hover:[#E5F1FF]">
              <TableHeader className="bg-[#3984EF] ">
                <TableRow className="hover:bg-[#3984EF] ">
                  <TableHead className="w-[50px] text-white rounded-tl-2xl">No</TableHead>
                  <TableHead className="text-white">Judul</TableHead>
                  <TableHead className="text-white">Deskripsi</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Tanggal Mulai</TableHead>
                  <TableHead className="text-white rounded-tr-2xl">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody >
                {datasurvei.map((survei, index) => (
                  <TableRow key={survei.id}>
                    <TableCell className="border-black border-b-2 border-t-2">{index + 1}</TableCell>
                    <TableCell className="border-black border-b-2 border-t-2 max-w-[150px] truncate overflow-hidden whitespace-nowrap">{survei.judul}</TableCell>
                    <TableCell className="border-black border-b-2 border-t-2 max-w-[150px] truncate overflow-hidden whitespace-nowrap"> {survei.deskripsi} </TableCell>

                    <TableCell className="border-black border-b-2 border-t-2">{survei.status}</TableCell>
                    <TableCell className="border-black border-b-2 border-t-2">{survei.tanggalmulai}</TableCell>
                    <TableCell className="border-black border-b-2 border-t-2 ">
                      <Link href="/admin/survei/detail">
                      <Button className="p-2 rounded-md bg-blue-200 hover:bg-blue-200 transition-transform hover:scale-105 active:scale-95" title="Lihat detail klien" >
                        <Image src="/detail.svg" alt="Detail" width={15} height={15} priority />
                      </Button>
                      </Link>
                      <Link href='/admin/survei/edit'>
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
