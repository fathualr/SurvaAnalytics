import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function AddSurvei() {
  return (
    <div className="w-full p-10">
      <div className="flex flex-row">
        <Button className="w-32 h-10 mr-4 bg-[#FFBF68] hover:bg-[#FFBF68] text-sm rounded-md font-semibold ">Kelola survei</Button>
        <Button className="w-32 h-10 bg-[#FFBF68] hover:bg-[#FFBF68] text-sm rounded-md font-semibold">Explore survei</Button>
      </div>

      <div className="flex flex-col items-center mt-6">
        <p className="text-3xl font-bold mb-1 ">Buat survei</p>
        <div className="h-3 bg-[#1860C6] rounded-full w-full mt-2"/>
      </div>

      <div className="mt-6 space-y-4">

        <div>
          <Label className="text-lg font-bold mb-1">Nama survei</Label>
          <input type="text" className="w-full border-2 border-black rounded-md px-3 py-2"/>
        </div>

        <div>
          <Label className="text-lg font-bold mb-1">Deskripsi survei</Label>
          <textarea className="w-full border-2 border-black rounded-md px-3 py-2" rows={5}/>
        </div>

        <div className="flex justify-center mt-6">
        <Button className="bg-white hover:bg-white border-3 border-black text-black font-bold w-48 rounded-md">Tambah Pertanyaan</Button>
        </div>

        <Link href="/managesurvei/add/criteria">
        <div className="flex justify-end mt-6">
        <Button className="bg-white hover:bg-white border-3 border-black text-black font-bold w-48 rounded-md">lanjut</Button>
        </div>
        </Link>
        
      </div>
    </div>
  );
}