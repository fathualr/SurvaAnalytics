'use client'

import { useState } from 'react'
import Link from 'next/link'
import { authService } from '../api'
import { AuthResponse } from '../types'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Button } from '@/components/ui/button'

interface VerifyOtpFormProps {
  email: string
  onSuccess: (response: AuthResponse) => void
  onBack: () => void
  setError: (error: string) => void
  setLoading: (loading: boolean) => void
  loading: boolean
}

export default function VerifyOtpForm({
  email,
  onSuccess,
  onBack,
  setError,
  setLoading,
  loading,
}: VerifyOtpFormProps) {
  const [otp, setOtp] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authService.verifyOtp({ email, otp })
      if (response.status === 'success') {
        onSuccess(response)
      } else {
        setError(response.message || 'Kode OTP tidak valid')
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold">Verifikasi OTP</h1>
        <p className="text-sm  mt-1">
          Kode OTP telah dikirim ke{' '}
          <span className="font-semibold underline">{email}</span>
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
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <p className="text-xs font-medium">30 : 00</p>

        <div className="flex justify-between gap-4 w-full">
          <Button
            type="button"
            onClick={onBack}
            disabled={loading}
            variant="ghost"
            className="font-semibold text-sm hover:text-primary-1"
          >
            Kembali
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className="font-semibold  w-[120px] rounded-md text-md bg-secondary-1 hover:bg-secondary-2 text-primary-1 hover:text-primary-2"
          >
            {loading ? 'Memverifikasi...' : 'Verifikasi'}
          </Button>
        </div>
      </form>

      <footer className="mt-6 text-center text-sm ">
        <p className="mb-1">Tidak menerima kode?</p>
        <Link
          href="#"
          className="text-accent-1 hover:underline font-medium"
        >
          Kirim ulang kode
        </Link>
      </footer>
    </>
  )
}
