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
      <h2 className="text-2xl font-semibold mt-4">Edit Hadiah</h2>
      <form className="w-full bg-[#F2F9FF] border border-[#3E82CD] p-4 rounded-xl mt-6 shadow-sm">
        <div className="divide-y divide-[#D0E3F6]">
          
        <div className="space-y-4">
        <div className="grid grid-cols-[50px_10px_1fr] items-center gap-x-2">
            <label htmlFor="nama" className="text-base font-semibold">Nama</label>
            <span className="justify-self-center">:</span>
            <Input id="nama" type="text" placeholder="Nama" defaultValue="Pulsa Telkomsel 25k"className="text-base w-full text-left" />
        </div>

        <div className="grid grid-cols-[50px_10px_1fr] items-center gap-x-2">
            <label htmlFor="deskripsi" className="text-base font-semibold">Deskripsi</label>
            <span className="justify-self-center">:</span>
            <Input id="deskripsi" type="text" placeholder="deskripsi" defaultValue="Pulsa Telkomsel senilai Rp25.000" className="text-base w-full text-left"/>
        </div>

        <div className="grid grid-cols-[50px_10px_1fr] items-center gap-x-2">
            <label htmlFor="stok" className="text-base font-semibold">Stok</label>
            <span className="justify-self-center">:</span>
            <Input id="stok" type="text"  defaultValue="10" className="text-base w-full text-left"/>
        </div>
        
        <div className="grid grid-cols-[50px_10px_1fr] items-center gap-x-2">
            <label htmlFor="harga-poin" className="text-base font-semibold">Harga Poin</label>
            <span className="justify-self-center">:</span>
            <Input id="harga-poin" type="text"  defaultValue="500" className="text-base w-full text-left"/>
        </div>
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
