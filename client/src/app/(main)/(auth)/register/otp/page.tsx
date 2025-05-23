import Link from "next/link";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function InputOtp() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="flex flex-col gap-2 bg-[url('/images/background-register.png')] bg-cover w-[400px] h-[400px] rounded-none rounded-bl-[70px] rounded-tr-[70px] ">
        <CardHeader className="items-center justify-center pt-12">
          <CardTitle className="font-semibold text-3xl text-white">Sign up</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center pt-4">
          <p className="text-base text-white font-semibold">OTP</p>
            <InputOTP   maxLength={6}>
            <InputOTPGroup className="border-none pt-4">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
            </InputOTPGroup>
            </InputOTP>
  
            <p className="pt-1 text-white text-xs font-semibold">30 : 00</p>
            <div className="pt-4">
                <Button className="w-[120px] rounded-xl text-md bg-[#FFBF68] text-white hover:bg-gray-200">
                Verifikasi
                </Button>
            </div>
        </CardContent>

        <CardFooter className="pt-6 items-center justify-center text-white">
            <div className="flex flex-col items-center justify-center gap 2 text-xs font-semibold">
                <p>Tidak menerima kode?</p>
                <Link href="/login/page.tsx" className="underline pl-1 hover:text-blue-300 transition-colors duration-200">
                    <p>Kirim ulang kode </p>
                 </Link>
             </div>
        </CardFooter>
      </Card>
    </div>
  );
}
