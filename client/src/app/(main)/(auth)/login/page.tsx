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

export default function Login () {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="flex flex-col gap-2 bg-[url('/images/background-login.png')] bg-cover w-[400px] h-[400px] rounded-none rounded-bl-[70px] rounded-tr-[70px] ">
      <CardHeader className="items-center justify-center pt-9 -mb-1">
        <CardTitle className="font-semibold text-3xl text-white ">Sign in</CardTitle>
      </CardHeader>

      <CardContent className="pt-0.5">
        <div className="px-5 flex flex-col gap-3">
          <div>
            <p className="text-sm text-white font-semibold mb-1 pl-1">Username</p>
              <Input
                className="border-none bg-white rounded-xl w-full h-10 text-black"
                type="text"
              />
          </div>

          <div>
            <p className="text-sm text-white font-semibold mb-1 pl-1">Password</p>
              <Input
                className="border-none bg-white rounded-xl w-full h-10 text-black"
                type="password"
              />
          </div>
              
            <Button className="w-24 rounded-xl text-md bg-[#FFBF68] text-white hover:bg-gray-200 mt-1">
              Masuk
            </Button>
            <Link href="" className="text-xs text-white font-semibold pl-1 -mt-1" >lupa password</Link>
        </div>
      </CardContent>

      <CardFooter className="pt-1 items-center justify-center text-white">
        <div className="flex flex-col items-center justify-center gap 2 text-xs font-semibold">
          <p>Belum punya akun?</p>
          <p>Klik di sini untuk
            <Link  href="/login/page.tsx" className="underline pl-1 hover:text-blue-300 transition-colors duration-200">
              daftar
            </Link>
          </p>
        </div>
      </CardFooter>
        
      </Card>
    </div>
  );
}