'use client'

import { useState } from 'react'
import { authService } from '../api'
import { AuthResponse } from '../types'

import Link from 'next/link'
import { FormGroup } from '@/components/umum/form/form-group'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface EmailRegisterFormProps {
  onSuccess: (response: AuthResponse) => void
  setError: (error: string) => void
  setLoading: (loading: boolean) => void
  loading: boolean
}

export function EmailRegisterForm({
  onSuccess,
  setError,
  setLoading,
  loading,
}: EmailRegisterFormProps) {
  const [email, setEmail] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        <FormGroup label="Email" htmlFor="email">
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={handleChange}
            placeholder="test@email.com"
            className="border-none bg-accent-1 rounded-md w-full h-10 text-black"
            disabled={loading}
          />
        </FormGroup>

        <Button
          type="submit"
          disabled={loading}
          className="cursor-pointer font-semibold w-24 rounded-xl bg-secondary-1 hover:bg-secondary-2 text-primary-1 hover:text-primary-2"
          variant="default"
        >
          {loading ? 'Mendaftar...' : 'Daftar'}
        </Button>
      </form>

      <footer className="mt-6 text-center text-sm">
        <p>
          Sudah punya akun?{' '}
          <Link
            href="/login"
            className="text-accent-1 hover:underline font-medium"
          >
            Masuk di sini
          </Link>
        </p>
      </footer>
    </>
  )
}
