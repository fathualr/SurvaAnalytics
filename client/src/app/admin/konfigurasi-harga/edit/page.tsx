import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from "next/link"

export default function EditPage() {
  return (
    <div className="pl-2 bg-white">
      <h2 className="text-2xl font-semibold mt-4">Edit Harga</h2>
      <form className="w-full bg-[#F2F9FF] border border-[#3E82CD] p-4 rounded-xl mt-6 shadow-sm">
        <div className="divide-y divide-[#D0E3F6] ">
          
          <div className="grid grid-cols-[130px_10px_1fr] gap-x-4 py-2 items-center">
            <label htmlFor="judul" className="text-base font-semibold">Harga Dasar</label>
            <span className="justify-self-center">:</span>
            <Input id="judul" type="text" placeholder="Judul" defaultValue="Rp.15.000" className="text-base w-full justify-self-end text-left"/>
          </div>

          <div className="grid grid-cols-[130px_10px_1fr] gap-x-4 py-2 items-center">
            <label htmlFor="deskripsi" className="text-base font-semibold">Harga per Pertanyaan</label>
            <span className="justify-self-center">:</span>
            <Input id="deskripsi" type="text" placeholder="Deskripsi" defaultValue="Rp.10.000" className="text-base w-full justify-self-end text-left"/>
          </div>

          <div className="grid grid-cols-[130px_10px_1fr] gap-x-4 py-2 items-center">
            <label htmlFor="kriteria" className="text-base font-semibold">Harga per Responden</label>
            <span className="justify-self-center">:</span>
            <Input id="kriteria" type="text" defaultValue="Rp.200" className="text-base w-full justify-self-end text-left border-none" />
          </div>

          <div className="grid grid-cols-[130px_10px_1fr] gap-x-4 py-2 items-center">
            <label htmlFor="hadiahpoin" className="text-base font-semibold">Harga per Durasi</label>
            <span className="justify-self-center">:</span>
            <Input id="hadiahpoin" type="text" placeholder="Hadiah Poin" defaultValue="Rp.5.000" className="text-base w-fulljustify-self-end text-left" />
          </div>

        </div>

        <div className="flex justify-between mt-4">
          <Link href="/admin/konfigurasi-harga">
          <Button className="bg-[#3E82CD] text-white hover:opacity-75">Kembali</Button>
          </Link>   
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-[#FFBF68] hover:opacity-60 hover:bg-[#FFBF68]" type="button" variant="default">Simpan</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Konfirmasi Simpan</AlertDialogTitle>
              </AlertDialogHeader >
              <p>Apakah kamu yakin ingin menyimpan perubahan?</p>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button type="submit" className="bg-[#FFBF68] hover:opacity-60 hover:bg-[#FFBF68] text-white px-4 py-2 rounded-md ">
                    Ya, Simpan
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </form>
    </div>
  )
}
