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
    <div className="flex items-center justify-center min-h-screen">
      <Card className="p-8 flex flex-col gap-2 bg-[url('/images/background-form.png')] bg-cover w-[750px] h-[500px] rounded-none rounded-bl-[70px] rounded-tr-[70px] ">
        <CardHeader className="items-center justify-center">
          <CardTitle className="font-semibold text-3xl text-white ">Sign up</CardTitle>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-2">
            <div className="flex w-full gap-2">
                <div className="flex-1">
                <label htmlFor="nama" className="text-md text-white font-semibold">Nama</label>
                <Input className="border-none bg-white rounded-sm h-10 text-black w-full" id="nama" type="text" />
                </div>
                <div className="flex-1">
                <label htmlFor="tanggal" className="text-md text-white font-semibold">Tanggal Lahir</label>
                <input className="w-full pl-2 border-none bg-white rounded-sm h-10 text-black" id="tanggal" type="date" />
                </div>
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
