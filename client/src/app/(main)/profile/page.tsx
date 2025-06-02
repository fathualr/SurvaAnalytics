import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function Profile() {
  return (
  <div className="w-full p-10">
    <div className="flex">
      <Button className="w-32 h-10 mr-4 bg-[#FFBF68] hover:bg-[#FFBF68] text-sm rounded-md font-semibold">Kelola survei</Button>
    </div>

    <div className="mt-8 bg-[#71A9DA] text-white p-10 rounded-xl flex flex-col justify-between ">
      <div className="space-y-4 text-sm">
        <div className="flex items-center pb-2 border-b border-gray-500">
          <span className="w-36 font-semibold">Nama</span>
          <span className="mr-6">:</span>
          <Input defaultValue="Ajiz" className="h-9 w-full font-semibold"/>
        </div>
        <div className="flex items-center pb-2 border-b border-gray-500">
          <span className="w-36 font-semibold" >Tanggal Lahir</span>
          <span className="mr-6">:</span>
          <Input type="date" defaultValue="2025-06-05" className="h-9 w-full font-semibold"/>
        </div>
        <div className="flex items-center pb-2 border-b border-gray-500">
          <span className="w-36 font-semibold" >Email</span>
          <span className="mr-6">:</span>
          <Input type="email" value="ajiz@gmail.com" className="h-9 w-full font-semibold" readOnly/>
        </div>
        <div className="flex items-center pb-2 border-b border-gray-500">
          <span className="w-36 font-semibold" >Jenis Kelamin</span>
          <span className="mr-6">:</span>
          <div className="w-full">
            <Select>
              <SelectTrigger className="text-white w-full h-10 font-semibold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pria" className="font-semibold"><img src="/icons/managesurvey/male.svg" className="w-4 h-4"/>Pria</SelectItem>
                <SelectItem value="wanita" className="font-semibold"><img src="/icons/managesurvey/female.svg" className="w-4 h-4"/>Wanita</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center pb-2 border-b border-gray-500">
          <span className="w-36 font-semibold" >Asal Domisili</span>
          <span className="mr-6">:</span>
          <Input defaultValue="Batam" className="h-9 w-full font-semibold"/>
        </div>
        <div className="flex items-center pb-2 border-b border-gray-500">
          <span className="w-36 font-semibold" >Status Anda</span>
          <span className="mr-6">:</span>
          <Input defaultValue="Mahasiswa" className="h-9 w-full font-semibold"/>
        </div>
      </div>

      <div className="flex justify-end mt-10">
        <Button className="w-28 h-9 bg-[#FFBF68] hover:bg-[#FFBF68] text-sm rounded-md font-semibold">Edit Profil</Button>
      </div>
    </div>
  </div>

  );
}