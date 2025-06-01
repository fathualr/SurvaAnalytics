'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FormGroup } from '@/components/umum/form/form-group'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/umum/form/password-input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox' // pastikan ada

interface LoginFormProps {
  onSubmit: (payload: { email: string; password: string; remember_me: boolean }) => void
  loading: boolean
}

export function LoginForm({ onSubmit, loading }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember_me: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <>
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white">Masuk Akun</h1>
        <p className="text-sm mt-1 text-white">Silakan masuk dengan email dan password Anda</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormGroup label="Email" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="test@email.com"
            className="border-none bg-accent-1 rounded-md w-full h-10 text-black"
            disabled={loading}
          />
        </FormGroup>

        <FormGroup label="Password" htmlFor="password" className="mb-3">
          <PasswordInput
            id="password"
            name="password"
            required
            minLength={8}
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
            disabled={loading}
          />
        </FormGroup>

        <div className="flex items-center gap-2">
          <Checkbox
            id="remember_me"
            checked={formData.remember_me}
            onCheckedChange={(checked: boolean) =>
              setFormData((prev) => ({ ...prev, remember_me: checked }))
            }
            className="bg-accent-1 data-[state=checked]:bg-accent-1 data-[state=checked]:text-black"
            disabled={loading}
          />
          <label htmlFor="remember_me" className=" text-sm">
            Ingat saya
          </label>
        </div>

        <div className="pt-2 flex justify-center">
          <Button
            type="submit"
            disabled={loading}
            className="cursor-pointer font-semibold w-24 rounded-xl bg-secondary-1 hover:bg-secondary-2 text-primary-1 hover:text-primary-2"
            variant="default"
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </Button>
        </div>
      </form>

      <footer className="mt-6 text-center text-sm text-white">
        <p>
          Belum punya akun?{' '}
          <Link href="/register" className="underline hover:text-blue-300 font-medium">
            Daftar di sini
          </Link>
        </p>
      </footer>
    </>
  )
}
