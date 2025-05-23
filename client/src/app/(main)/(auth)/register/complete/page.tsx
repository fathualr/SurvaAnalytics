import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen py-8">
      <Card className="p-8 flex flex-col gap-2 bg-[url('/images/background-form.png')] bg-cover w-[750px] h-[730px] rounded-none rounded-bl-[70px] rounded-tr-[70px] ">
        <CardHeader className="items-center justify-center">
          <CardTitle className="font-semibold text-3xl text-white ">Profile Details</CardTitle>
        </CardHeader>

        <CardContent className="">
          <div className="flex flex-wrap gap-2">
            <div className="w-full">
                <label htmlFor="nama" className="text-md text-white font-semibold">Nama</label>
                <Input className="border-none bg-white rounded-sm h-10 text-black w-full" id="nama" type="text" />
            </div>
            <div className="w-full">
                <label htmlFor="tanggal" className="text-md text-white font-semibold">Tanggal Lahir</label>
                <Input className="w-full pl-2 border-none bg-white rounded-sm h-10 text-black" id="tanggal" type="date" />
            </div>
            <div className="w-full">
                <label htmlFor="email" className="text-md text-white font-semibold">Email</label>
                <Input className="border-none bg-white rounded-sm w-full h-10 text-black" id="email" type="email" />
            </div>

            <div className="w-full">
                <label htmlFor="password" className="text-md text-white font-semibold">Password</label>
                <Input className="border-none bg-white rounded-sm w-full h-10 text-black" id="password" type="password" />
            </div>

            <div className="w-full">
                <label htmlFor="confpassword" className="text-md text-white font-semibold">Confirm Password</label>
                <Input className="border-none bg-white rounded-sm w-full h-10 text-black" id="confpassword" type="password" />
            </div>

            <div className="w-full">
              <label htmlFor="jenis_kelamin" className="text-md text-white font-semibold">Jenis Kelamin</label>
              <select id="jenis_kelamin" name="jenis_kelamin" className="border-none bg-white rounded-sm w-full h-10 text-black px-2" >
                <option value="" aria-readonly>Pilih Jenis Kelamin </option>
                <option value="laki-laki">Laki-laki</option>
                <option value="perempuan">Perempuan</option>
              </select>
            </div>

            <div className="w-full">
                <label htmlFor="domisili" className="text-md text-white font-semibold">Asal Domisili</label>
                <Input className="border-none bg-white rounded-sm w-full h-10 text-black" id="domisili" type="password" />
            </div>

            <div className="w-full">
                <label htmlFor="status" className="text-md text-white font-semibold">Status Anda </label>
                <Input className="border-none bg-white rounded-sm w-full h-10 text-black" id="status" type="password" />
            </div>
            
            <div className="w-full flex justify-end pt-4">
              <Button className="w-32 rounded-sm text-md bg-[#FFBF68] text-white hover:bg-gray-200">
                Buat
              </Button>
            </div>
            </div>

        </CardContent>
      </Card>
    </div>
  );
}
