'use client'

import { useState } from 'react'
import { CompleteRegisterPayload } from '../types'
import { authService } from '../api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface CompleteRegisterFormProps {
  email: string
  registerToken: string
  onSuccess: () => void
  setError: (error: string) => void
  setLoading: (loading: boolean) => void
  loading: boolean
}

export default function CompleteRegisterForm({
  email,
  registerToken,
  onSuccess,
  setError,
  setLoading,
  loading,
}: CompleteRegisterFormProps) {
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    password: '',
    konfirmasi_password: '',
    jenis_kelamin: '',
    tanggal_lahir: '',
    domisili: '',
    status: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (formData.password !== formData.konfirmasi_password) {
      setError('Password dan konfirmasi password tidak sama')
      setLoading(false)
      return
    }

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
        }
      }
      console.log(payload)
      const response = await authService.completeAccount(payload)
      if (response.status === 'success') {
        onSuccess()
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

  return (
    <>
      <header className="mb-8 text-center">
        <h2 className="text-2xl font-bold">Detail Profil</h2>
        <p className="text-sm">Lengkapi informasi akun Anda</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6 w-[600px]">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              readOnly
              className="border-none bg-accent-1 rounded-md w-full h-10 text-black"
            />
          </div>

          <div>
            <label htmlFor="nama_lengkap" className="block text-sm font-medium mb-1">
              Nama Lengkap
            </label>
            <Input
              id="nama_lengkap"
              name="nama_lengkap"
              type="text"
              value={formData.nama_lengkap}
              className="border-none bg-accent-1 rounded-md w-full h-10 text-black"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              className="border-none bg-accent-1 rounded-md w-full h-10 text-black"
              onChange={handleChange}
              required
              minLength={8}
            />
          </div>

          <div>
            <label htmlFor="konfirmasi_password" className="block text-sm font-medium mb-1">
              Konfirmasi Password
            </label>
            <Input
              id="konfirmasi_password"
              name="konfirmasi_password"
              type="password"
              value={formData.konfirmasi_password}
              className="border-none bg-accent-1 rounded-md w-full h-10 text-black"
              onChange={handleChange}
              required
              minLength={8}
            />
          </div>

          <div>
            <label htmlFor="tanggal_lahir" className="block text-sm font-medium mb-1">
              Tanggal Lahir
            </label>
            <Input
              id="tanggal_lahir"
              name="tanggal_lahir"
              type="date"
              value={formData.tanggal_lahir}
              className="border-none bg-accent-1 rounded-md w-full h-10 text-black"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="jenis_kelamin" className="block text-sm font-medium mb-1">
              Jenis Kelamin
            </label>
            <select
              id="jenis_kelamin"
              name="jenis_kelamin"
              value={formData.jenis_kelamin}
              className="border-none bg-accent-1 rounded-md w-full h-10 text-black"
              onChange={handleChange}
              required
            >
              <option disabled value="">Pilih Jenis Kelamin</option>
              <option value="laki-laki">Laki-laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
          </div>

          <div>
            <label htmlFor="domisili" className="block text-sm font-medium mb-1">
              Asal Domisili
            </label>
            <Input
              id="domisili"
              name="domisili"
              type="text"
              value={formData.domisili}
              className="border-none bg-accent-1 rounded-md w-full h-10 text-black"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1">
              Status
            </label>
            <Input
              id="status"
              name="status"
              type="text"
              value={formData.status}
              className="border-none bg-accent-1 rounded-md w-full h-10 text-black"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="font-semibold w-40 rounded-xl bg-secondary-1 hover:bg-secondary-2 text-primary-1 hover:text-primary-2"
          >
            {loading ? 'Mendaftarkan...' : 'Buat'}
          </Button>
        </div>
      </form>
    </>
  )
}
