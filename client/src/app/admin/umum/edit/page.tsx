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

export default function EditPage() {
  return (
    <div className="pl-2 bg-white">
      <h2 className="text-2xl font-semibold mt-4">Detail Pengguna Umum</h2>
      <form className="w-full bg-[#F2F9FF] border border-[#3E82CD] p-4 rounded-xl mt-6 shadow-sm">
        <div className="divide-y divide-[#D0E3F6] ">
          {/* label  |  colon  |  input */}
          <div className="grid grid-cols-[130px_10px_1fr] gap-x-4 py-2 items-center">
            <label htmlFor="nama" className="text-base font-semibold">Nama</label>
            <span className="justify-self-center">:</span>
            <Input id="nama" type="text" placeholder="Nama" defaultValue="Abdul micro" className="text-base w-full justify-self-end text-left"/>
          </div>

          <div className="grid grid-cols-[130px_10px_1fr] gap-x-4 py-2 items-center">
            <label htmlFor="email" className="text-base font-semibold">Email</label>
            <span className="justify-self-center">:</span>
            <Input id="email" type="email" placeholder="Email" defaultValue="abdul@gmail.com" className="text-base w-full justify-self-end text-left"/>
          </div>

          <div className="grid grid-cols-[130px_10px_1fr] gap-x-4 py-2 items-center">
            <label htmlFor="tanggalLahir" className="text-base font-semibold">Tanggal Lahir</label>
            <span className="justify-self-center">:</span>
            <Input id="tanggalLahir" type="date" defaultValue="2024-10-10" className="text-base w-full justify-self-end text-center border-none" />
          </div>

          <div className="grid grid-cols-[130px_10px_1fr] gap-x-4 py-2 items-center">
            <label className="text-base font-semibold">Jenis Kelamin</label>
            <span className="justify-self-center">:</span>
            <Select defaultValue="Laki-laki">
              <SelectTrigger className="w-full justify-self-end text-center">
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent className="text-center">
                <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                <SelectItem value="Perempuan">Perempuan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-[130px_10px_1fr] gap-x-4 py-2 items-center">
            <label htmlFor="domisili" className="text-base font-semibold">Asal Domisili</label>
            <span className="justify-self-center">:</span>
            <Input id="domisili" type="text" placeholder="Domisili" defaultValue="Batam" className="text-base w-fulljustify-self-end text-left" />
          </div>

          <div className="grid grid-cols-[130px_10px_1fr] gap-x-4 py-2 items-center">
            <label htmlFor="status" className="text-base font-semibold">Status Anda</label>
            <span className="justify-self-center">:</span>
            <Input id="status" type="text" placeholder="Status" defaultValue="Mahasiswa" className="text-base w-full justify-self-end text-left"/>
          </div>
        </div>

        <div className="flex justify-end mt-4">
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
