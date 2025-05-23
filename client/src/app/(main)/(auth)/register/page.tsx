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
      <Card className="flex flex-col gap-2 bg-[url('/images/background-register.png')] bg-cover w-[400px] h-[400px] rounded-none rounded-bl-[70px] rounded-tr-[70px] ">
        <CardHeader className="items-center justify-center pt-15">
          <CardTitle className="font-semibold text-3xl text-white ">Sign up</CardTitle>
        </CardHeader>

        <CardContent className="pt-4">
          <p className="text-sm text-white pl-8 font-semibold">Email</p>
            <div className="pt-2 px-6 flex flex-col gap-3">
              <Input
                className="border-none bg-white rounded-xl w-full h-10 text-black"
                type="email"
              />
              <Button className="w-24 rounded-xl text-md bg-[#FFBF68] text-white hover:bg-gray-200">
                Buat
              </Button>
            </div>
        </CardContent>

        <CardFooter className="pt-6 items-center justify-center text-white">
          <div className="flex flex-col items-center justify-center gap 2 text-xs font-semibold">
            <p>Sudah punya akun?</p>
            <p>Klik di sini untuk
              <Link  href="/login/page.tsx" className="underline pl-1 hover:text-blue-300 transition-colors duration-200">
                login
              </Link>
            </p>
          </div>
        </CardFooter>
        
      </Card>
    </div>
  );
}
