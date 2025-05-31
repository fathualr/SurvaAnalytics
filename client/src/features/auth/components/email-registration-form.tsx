'use client'

import { useState } from 'react'
import Link from 'next/link'
import { authService } from '../api'
import { AuthResponse } from '../types'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface RegisterInitFormProps {
  onSuccess: (response: AuthResponse) => void
  setError: (error: string) => void
  setLoading: (loading: boolean) => void
  loading: boolean
}

export default function RegisterInitForm({
  onSuccess,
  setError,
  setLoading,
  loading,
}: RegisterInitFormProps) {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authService.emailRegister({ email })
      if (response.status === 'success') {
        onSuccess(response)
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

  return (
    <>
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Akun</h1>
        <p className="text-sm mt-1">Masukkan email untuk mulai mendaftar</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="border-none bg-accent-1 rounded-md w-full h-10 text-black"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="font-semibold w-24 rounded-xl bg-secondary-1 hover:bg-secondary-2 text-primary-1 hover:text-primary-2"
          variant="default"
        >
          {loading ? 'Mengirim...' : 'Daftar'}
        </Button>
      </form>

      <footer className="mt-6 text-center text-sm">
        <p>
          Sudah punya akun?{' '}
          <Link href="/login" className="text-accent-1 hover:underline font-medium">
            Masuk di sini
          </Link>
        </p>
      </footer>
    </>
  )
}
