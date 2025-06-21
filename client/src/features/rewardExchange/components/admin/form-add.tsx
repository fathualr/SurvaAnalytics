'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormGroup } from '@/components/umum/form/form-group'
import { useAdminCreateRewardExchange } from '../../hooks/useAdminRewardExchange'

const formSchema = z.object({
  id_umum: z.string().min(1, 'ID Umum wajib diisi'),
  id_hadiah: z.string().min(1, 'ID Hadiah wajib diisi'),
})

type FormValues = z.infer<typeof formSchema>

export const FormAddRewardExchange = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const { mutateAsync: createExchange } = useAdminCreateRewardExchange()

  const onSubmit = async (values: FormValues) => {
    try {
      await createExchange(values)
      toast.success('Penukaran hadiah berhasil ditambahkan')
      reset()
      router.push('/admin/manage-exchange')
    } catch (err: any) {
      toast.error(err?.message || 'Gagal menambahkan penukaran hadiah')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormGroup label="ID Umum (User)" htmlFor="id_umum">
        <Input id="id_umum" type="text" {...register('id_umum')} />
        {errors.id_umum && (
          <p className="text-sm text-red-500">{errors.id_umum.message}</p>
        )}
      </FormGroup>

      <FormGroup label="ID Hadiah" htmlFor="id_hadiah">
        <Input id="id_hadiah" type="text" {...register('id_hadiah')} />
        {errors.id_hadiah && (
          <p className="text-sm text-red-500">{errors.id_hadiah.message}</p>
        )}
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
