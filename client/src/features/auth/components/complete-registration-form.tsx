'use client'

import { useState } from 'react'
import { PasswordInput } from '@/components/umum/form/password-input'
import { FormGroup } from '@/components/umum/form/form-group'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RegisterForm } from '../hooks/useRegister'

interface CompleteAccountFormProps {
  email: string;
  onSubmit: (formData: RegisterForm) => void;
  loading: boolean;
}

export function CompleteAccountForm({
  email,
  onSubmit,
  loading,
}: CompleteAccountFormProps) {
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    password: '',
    konfirmasi_password: '',
    jenis_kelamin: '',
    tanggal_lahir: '',
    region: '',
    status: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <>
      <header className="mb-8 text-center">
        <h2 className="text-2xl font-bold">Detail Profil</h2>
        <p className="text-sm">Lengkapi informasi akun Anda</p>
      </header>

      <form onSubmit={handleSubmit} className="w-full max-w-[600px] space-y-6">
        <FormGroup label="Email" htmlFor="email">
          <Input
            id="email"
            type="email"
            value={email}
            readOnly
            className="border-none bg-accent-1 rounded-md w-full h-10 text-black"
          />
        </FormGroup>

        <FormGroup label="Nama Lengkap" htmlFor="nama_lengkap">
          <Input
            id="nama_lengkap"
            name="nama_lengkap"
            type="text"
            value={formData.nama_lengkap}
            onChange={handleChange}
            required
            className="border-none bg-accent-1 rounded-md w-full h-10 text-black"
          />
        </FormGroup>

        <FormGroup label="Password" htmlFor="password">
          <PasswordInput
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
          />
        </FormGroup>

        <FormGroup label="Konfirmasi Password" htmlFor="konfirmasi_password">
          <PasswordInput
            name="konfirmasi_password"
            value={formData.konfirmasi_password}
            onChange={handleChange}
            required
            minLength={8}
          />
        </FormGroup>

        <FormGroup label="Tanggal Lahir" htmlFor="tanggal_lahir">
          <Input
            id="tanggal_lahir"
            name="tanggal_lahir"
            type="date"
            value={formData.tanggal_lahir}
            onChange={handleChange}
            required
            className="border-none bg-accent-1 rounded-md w-full h-10 text-black"
          />
        </FormGroup>

        <FormGroup label="Jenis Kelamin" htmlFor="jenis_kelamin">
          <select
            id="jenis_kelamin"
            name="jenis_kelamin"
            value={formData.jenis_kelamin}
            onChange={handleChange}
            required
            className="border-none bg-accent-1 rounded-md w-full h-10 text-black"
          >
            <option disabled value="">Pilih Jenis Kelamin</option>
            <option value="laki-laki">Laki-laki</option>
            <option value="perempuan">Perempuan</option>
          </select>
        </FormGroup>

        <FormGroup label="Region" htmlFor="region">
          <Input
            id="region"
            name="region"
            type="text"
            value={formData.region}
            onChange={handleChange}
            required
            className="border-none bg-accent-1 rounded-md w-full h-10 text-black"
          />
        </FormGroup>

        <FormGroup label="Status Pekerjaan / Pendidikan" htmlFor="status">
          <Input
            id="status"
            name="status"
            type="text"
            value={formData.status}
            onChange={handleChange}
            required
            className="border-none bg-accent-1 rounded-md w-full h-10 text-black"
          />
        </FormGroup>

        <div className="pt-4 flex justify-center">
          <Button
            type="submit"
            disabled={loading}
            className="cursor-pointer font-semibold w-40 rounded-xl bg-secondary-1 hover:bg-secondary-2 text-primary-1 hover:text-primary-2"
          >
            {loading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </form>
    </>
  )
}
