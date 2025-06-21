'use client'

import { Input } from '@/components/ui/input'
import { FormGroup } from '@/components/umum/form/form-group'
import { useAdminHadiah } from '../../hooks/useAdminReward'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/hooks/useAuth'

interface FormDetailRewardProps {
  rewardId: string
}

export const FormDetailReward = ({ rewardId }: FormDetailRewardProps) => {
  const { isLoggedIn, loading: authLoading } = useAuth()
  const shouldFetch = isLoggedIn && !authLoading

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useAdminHadiah(rewardId, shouldFetch)

  if (isLoading || isFetching) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
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
    <div className="space-y-4">
      <FormGroup label="Nama Hadiah" htmlFor="nama">
        <Input id="nama" value={data.nama} readOnly disabled />
      </FormGroup>

      <FormGroup label="Deskripsi" htmlFor="deskripsi">
        <Input id="deskripsi" value={data.deskripsi || '-'} readOnly disabled />
      </FormGroup>

      <FormGroup label="Stok" htmlFor="stok">
        <Input id="stok" value={data.stok.toString()} readOnly disabled />
      </FormGroup>

      <FormGroup label="Harga Poin" htmlFor="harga_poin">
        <Input id="harga_poin" value={data.harga_poin.toString()} readOnly disabled />
      </FormGroup>

      <FormGroup label="Dibuat Pada" htmlFor="created_at">
        <Input
          id="created_at"
          value={new Date(data.created_at).toLocaleString()}
          readOnly
          disabled
        />
      </FormGroup>

      <FormGroup label="Diperbarui Pada" htmlFor="updated_at">
        <Input
          id="updated_at"
          value={new Date(data.updated_at).toLocaleString()}
          readOnly
          disabled
        />
      </FormGroup>
    </div>
  )
}
