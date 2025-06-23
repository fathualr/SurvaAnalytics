'use client'

import { useEffect, useState } from 'react'
import { useKonfigurasiHarga, useUpdateKonfigurasiHarga } from '../hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

interface FormValues {
  harga_dasar: string
  harga_per_pertanyaan: string
  harga_per_responden: string
  harga_per_durasi: string
}

export function FormSurveyPrice() {
  const [isEditMode, setIsEditMode] = useState(false)
  const { config, isLoading, isError, refetch } = useKonfigurasiHarga()
  const { mutateAsync: updateConfig, isPending } = useUpdateKonfigurasiHarga()

  const [form, setForm] = useState<FormValues>({
    harga_dasar: '',
    harga_per_pertanyaan: '',
    harga_per_responden: '',
    harga_per_durasi: '',
  })

  useEffect(() => {
    if (config) {
      setForm({
        harga_dasar: config.harga_dasar || '',
        harga_per_pertanyaan: config.harga_per_pertanyaan || '',
        harga_per_responden: config.harga_per_responden || '',
        harga_per_durasi: config.harga_per_durasi || '',
      })
    }
  }, [config])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const onCancel = () => {
    if (config) {
      setForm({
        harga_dasar: config.harga_dasar || '',
        harga_per_pertanyaan: config.harga_per_pertanyaan || '',
        harga_per_responden: config.harga_per_responden || '',
        harga_per_durasi: config.harga_per_durasi || '',
      })
    }
    setIsEditMode(false)
  }

  const onSubmit = async () => {
    try {
      await updateConfig({
        harga_dasar: parseFloat(form.harga_dasar),
        harga_per_pertanyaan: parseFloat(form.harga_per_pertanyaan),
        harga_per_responden: parseFloat(form.harga_per_responden),
        harga_per_durasi: parseFloat(form.harga_per_durasi),
      })
      toast.success('Berhasil memperbarui konfigurasi harga')
      refetch()
      setIsEditMode(false)
    } catch (err: any) {
      toast.error(err?.message || 'Gagal menyimpan')
    }
  }

  if (isLoading) return <Skeleton className="h-40 w-full" />
  if (isError || !config) return <p className="text-red-500">Gagal memuat data</p>

  return (
      <div className="divide-y divide-[#D0E3F6] space-y-2">
        {[
          { label: 'Harga Dasar', key: 'harga_dasar' },
          { label: 'Harga per Pertanyaan', key: 'harga_per_pertanyaan' },
          { label: 'Harga per Responden', key: 'harga_per_responden' },
          { label: 'Harga per Durasi', key: 'harga_per_durasi' },
        ].map(({ label, key }) => (
          <div
            key={key}
            className="grid grid-cols-[auto_1fr] gap-x-4 py-2 items-center"
          >
            <div className="content-center text-base h-10 font-semibold">{label}:</div>
            {isEditMode ? (
              <Input
                type="number"
                name={key}
                value={parseInt(form[key as keyof FormValues] || '0', 10).toString()}
                onChange={handleChange}
                className="w-full text-right border-none"
              />
            ) : (
              <div className="text-base text-right">
                Rp.{parseFloat(form[key as keyof FormValues] || '0').toLocaleString()}
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-end gap-3 mt-4">
          {isEditMode ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isPending}
              >
                Batal
              </Button>
              <Button
                type="button"
                onClick={onSubmit}
                disabled={isPending}
                className="bg-secondary-1 text-white hover:bg-secondary-1 hover:opacity-60"
              >
                {isPending ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </>
          ) : (
            <Button
              type="button"
              onClick={() => setIsEditMode(true)}
              className="bg-secondary-1 text-white hover:bg-secondary-1 hover:opacity-60"
            >
              Edit
            </Button>
          )}
        </div>
    </div>
  )
}
