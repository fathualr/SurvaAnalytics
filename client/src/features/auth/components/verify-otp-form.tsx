'use client'

import { useState } from 'react'
import { useCountdown } from '@/hooks/useCountdown'
import { formatTime } from '@/utils/format'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Button } from '@/components/ui/button'

interface VerifyOtpFormProps {
  email: string
  onSubmit: (otp: string) => void
  onBack: () => void
  onResend: () => Promise<void>
  loading: boolean
  loadingResend: boolean
}

export function VerifyOtpForm({
  email,
  onSubmit,
  onBack,
  onResend,
  loading,
  loadingResend,
}: VerifyOtpFormProps) {
  const [otp, setOtp] = useState('')
  const {
    seconds: resendCountdown,
    canResend,
    reset: resetCountdown,
  } = useCountdown(60)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(otp)
  }

  const handleResend = async () => {
    if (!canResend) return
    await onResend()
    resetCountdown()
  }

  return (
    <>
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold">Verifikasi OTP</h1>
        <p className="text-sm mt-1">
          Kode OTP telah dikirim ke{' '}
          <span className="font-semibold underline">
            {email || 'email anda'}
          </span>
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center">
        <InputOTP
          value={otp}
          onChange={setOtp}
          maxLength={6}
          containerClassName="pt-2"
        >
          <InputOTPGroup className="text-black">
            {[...Array(6)].map((_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <div className="flex justify-between w-full">
          <Button
            type="button"
            onClick={onBack}
            disabled={loading || loadingResend}
            variant="ghost"
            className="cursor-pointer font-semibold w-full max-w-[120px] text-sm rounded-xl hover:text-primary-1"
          >
            Kembali
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className="cursor-pointer font-semibold w-full max-w-[120px] rounded-xl bg-secondary-1 hover:bg-secondary-2 text-primary-1 hover:text-primary-2"
          >
            {loading ? 'Memverifikasi...' : 'Verifikasi'}
          </Button>
        </div>
      </form>

      <footer className="mt-6 text-center text-sm">
        <p className="mb-1">Tidak menerima kode?</p>
        {canResend ? (
          <button
            onClick={handleResend}
            className="cursor-pointer text-accent-1 hover:underline font-medium"
            disabled={loadingResend}
          >
            {loadingResend ? 'Mengirim ulang...' : 'Kirim ulang OTP'}
          </button>
        ) : (
          <span className="cursor-not-allowed font-medium">
            {formatTime(resendCountdown)}
          </span>
        )}
      </footer>
    </>
  )
}
