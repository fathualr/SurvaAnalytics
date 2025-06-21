'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormGroup } from '@/components/umum/form/form-group'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useAdminHadiah, useAdminUpdateHadiah } from '../../hooks/useAdminReward'

const formSchema = z.object({
  nama: z.string().min(1, 'Nama tidak boleh kosong').max(255),
  deskripsi: z.string().max(500).optional(),
  stok: z.coerce.number().nonnegative({ message: 'Stok tidak boleh negatif' }),
  harga_poin: z.coerce.number().positive({ message: 'Harga poin harus lebih dari 0' }),
})

type FormValues = z.infer<typeof formSchema>

interface FormEditHadiahProps {
  rewardId: string
}

export const FormEditReward = ({ rewardId }: FormEditHadiahProps) => {
  const { isLoggedIn, loading: authLoading } = useAuth()
  const shouldFetch = isLoggedIn && !authLoading

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useAdminHadiah(rewardId, shouldFetch)

  const { mutateAsync: updateHadiah, isPending: isUpdating } = useAdminUpdateHadiah()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: '',
      deskripsi: '',
      stok: 0,
      harga_poin: 0,
    },
  })

  const { register, handleSubmit, formState: { errors }, reset } = form

  useEffect(() => {
    if (data) {
      const hadiah = data
      reset({
        nama: hadiah.nama,
        deskripsi: hadiah.deskripsi ?? '',
        stok: parseInt(hadiah.stok),
        harga_poin: parseInt(hadiah.harga_poin),
      })
    }
  }, [data, reset])

  const onSubmit = async (values: FormValues) => {
    try {
      await updateHadiah({
        id: rewardId,
        data: {
          nama: values.nama,
          deskripsi: values.deskripsi,
          stok: values.stok,
          harga_poin: values.harga_poin,
        },
      })

      toast.success('Hadiah berhasil diperbarui')
      refetch()
    } catch (err: any) {
      toast.error(err?.message || 'Gagal memperbarui hadiah')
    }
  }

  if (isLoading || isFetching) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-red-600 font-medium">
          Gagal memuat data hadiah. {error?.message && `(${error.message})`}
        </p>
        <Button variant="outline" onClick={() => refetch()} className="text-sm">
          Coba Lagi
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormGroup label="Nama Hadiah" htmlFor="nama">
        <Input id="nama" {...register('nama')} />
        {errors.nama && <p className="text-sm text-red-500">{errors.nama.message}</p>}
      </FormGroup>

      <FormGroup label="Deskripsi" htmlFor="deskripsi">
        <Input id="deskripsi" {...register('deskripsi')} />
        {errors.deskripsi && <p className="text-sm text-red-500">{errors.deskripsi.message}</p>}
      </FormGroup>

      <FormGroup label="Stok" htmlFor="stok">
        <Input id="stok" type="number" {...register('stok')} />
        {errors.stok && <p className="text-sm text-red-500">{errors.stok.message}</p>}
      </FormGroup>

      <FormGroup label="Harga Poin" htmlFor="harga_poin">
        <Input id="harga_poin" type="number" {...register('harga_poin')} />
        {errors.harga_poin && <p className="text-sm text-red-500">{errors.harga_poin.message}</p>}
      </FormGroup>

      <Button
        type="submit"
        disabled={isUpdating}
        className="rounded-md bg-primary-2 text-accent-1 border text-center text-sm p-2 hover:bg-accent-1 hover:text-primary-1 transition-all"
      >
        {isUpdating ? 'Menyimpan...' : 'Simpan Perubahan'}
      </Button>
    </form>
  )
}
