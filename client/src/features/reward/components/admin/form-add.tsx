'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormGroup } from '@/components/umum/form/form-group'
import { useAdminCreateHadiah } from '../../hooks/useAdminReward'

const formSchema = z.object({
  nama: z.string().min(1, 'Nama hadiah wajib diisi').max(255),
  deskripsi: z.string().optional(),
  stok: z.coerce
    .number({ invalid_type_error: 'Stok harus berupa angka' })
    .int()
    .min(0, 'Stok tidak boleh negatif'),
  harga_poin: z.coerce
    .number({ invalid_type_error: 'Poin harus berupa angka' })
    .int()
    .min(1, 'Poin minimal 1'),
})

type FormValues = z.infer<typeof formSchema>

export const FormAddReward = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const { mutateAsync: createHadiah } = useAdminCreateHadiah()

  const onSubmit = async (values: FormValues) => {
    try {
      await createHadiah({
        nama: values.nama,
        deskripsi: values.deskripsi,
        stok: values.stok,
        harga_poin: values.harga_poin,
      })

      toast.success('Hadiah berhasil ditambahkan')
      reset()
      router.push('/admin/manage-reward')
    } catch (err: any) {
      toast.error(err?.message || 'Gagal menambahkan hadiah')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormGroup label="Nama Hadiah" htmlFor="nama">
        <Input id="nama" type="text" {...register('nama')} />
        {errors.nama && <p className="text-sm text-red-500">{errors.nama.message}</p>}
      </FormGroup>

      <FormGroup label="Deskripsi" htmlFor="deskripsi">
        <textarea
          id="deskripsi"
          {...register('deskripsi')}
          className="w-full border rounded p-2"
        />
      </FormGroup>

      <FormGroup label="Harga Poin" htmlFor="harga_poin">
        <Input id="harga_poin" type="number" min={1} {...register('harga_poin')} />
        {errors.harga_poin && (
          <p className="text-sm text-red-500">{errors.harga_poin.message}</p>
        )}
      </FormGroup>

      <FormGroup label="Stok Hadiah" htmlFor="stok">
        <Input id="stok" type="number" min={0} {...register('stok')} />
        {errors.stok && <p className="text-sm text-red-500">{errors.stok.message}</p>}
      </FormGroup>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-primary-2 text-accent-1 border text-center text-sm p-2 hover:bg-accent-1 hover:text-primary-1 transition-all"
      >
        {isSubmitting ? 'Menyimpan...' : 'Simpan'}
      </Button>
    </form>
  )
}
