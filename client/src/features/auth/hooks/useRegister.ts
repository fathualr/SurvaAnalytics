'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '../api'
import { CompleteRegisterPayload } from '../types'

export function useRegister() {
  const router = useRouter()
  const [step, setStep] = useState<'init' | 'verify' | 'complete'>('init')
  const [email, setEmail] = useState('')
  const [registerToken, setRegisterToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingResend, setLoadingResend] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initRegister = async (emailInput: string) => {
    setError(null)
    setLoading(true)
    try {
      const response = await authService.emailRegister({ email: emailInput })
      if (response.status === 'success') {
        setEmail(response.data?.email || '')
        setStep('verify')
      } else {
        setError(response.message || 'Gagal mengirim OTP')
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const resendOtp = async () => {
    setError(null)
    setLoadingResend(true)
    try {
      await authService.emailRegister({ email })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal mengirim ulang kode'
      setError(msg)
    } finally {
      setLoadingResend(false)
    }
  }
  
  const verifyOtp = async (otp: string) => {
    setError(null)

    if (!otp || otp.length < 6) {
      setError('Kode OTP harus terdiri dari 6 digit')
      return
    }

    setLoading(true)
    try {
      const response = await authService.verifyOtp({ email, otp })
      if (response.status === 'success') {
        setRegisterToken(response.data?.register_token || '')
        setStep('complete')
      } else {
        setError(response.message || 'OTP tidak valid')
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const completeRegister = async (formData: {
    nama_lengkap: string
    password: string
    konfirmasi_password: string
    jenis_kelamin: string
    tanggal_lahir: string
    domisili: string
    status: string
  }) => {
    setError(null)

    if (formData.password !== formData.konfirmasi_password) {
      setError('Password dan konfirmasi password tidak sama')
      return
    }

    setLoading(true)
    try {
      const payload: CompleteRegisterPayload = {
        register_token: registerToken,
        password: formData.password,
        nama: formData.nama_lengkap,
        profil_responden: {
          tanggal_lahir: formData.tanggal_lahir,
          status: formData.status,
          region: formData.domisili,
          jenis_kelamin: formData.jenis_kelamin,
        },
      }

      const response = await authService.completeAccount(payload)

      if (response.status === 'success') {
        router.push('/login')
      } else {
        setError(response.message || 'Gagal menyelesaikan pendaftaran')
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return {
    step,
    email,
    loading,
    loadingResend,
    error,
    initRegister,
    resendOtp,
    verifyOtp,
    completeRegister,
    setStep,
    setError,
  }
}
