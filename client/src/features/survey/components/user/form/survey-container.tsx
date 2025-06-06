'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useUserSurvey, useUpdateUserSurvey, useDeleteUserSurvey } from '@/features/survey/hooks/useUserSurveys'
import { SurveyForm } from './survey-form'
import { Button } from '@/components/ui/button'
import { ConfirmDeleteDialog } from '@/components/umum/confirm-delete-dialog'

interface SurveyFormProps {
  surveyId: string
}

export function SurveyContainer({ surveyId }: SurveyFormProps) {
  const router = useRouter()
  const { data, isLoading, isError, error } = useUserSurvey(surveyId)
  const updateSurvey = useUpdateUserSurvey()
  const deleteSurvey = useDeleteUserSurvey()

  useEffect(() => {
    if (updateSurvey.isSuccess) toast.success('Perubahan berhasil disimpan')
    if (updateSurvey.isError) toast.error('Gagal menyimpan perubahan')
  }, [updateSurvey.isSuccess, updateSurvey.isError])

  useEffect(() => {
    if (deleteSurvey.isSuccess) {
      toast.success('Survei berhasil dihapus')
      router.push('/manage-survey')
    }
    if (deleteSurvey.isError) {
      toast.error('Gagal menghapus survei')
    }
  }, [deleteSurvey.isSuccess, deleteSurvey.isError])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-pulse text-gray-500 text-sm">Memuat survei...</div>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="flex justify-center items-center min-h-[300px] text-red-600 text-sm">
        Gagal memuat data survei: {error?.message || 'Unknown error'}
      </div>
    )
  }

  const initialData = {
    judul: data.judul,
    deskripsi: data.deskripsi ?? '',
    kriteria: data.kriteria ?? {},
    jumlah_responden: data.jumlah_responden,
    tanggal_mulai: data.tanggal_mulai,
    tanggal_berakhir: data.tanggal_berakhir,
  }

  return (
    <>
      <ConfirmDeleteDialog
        title="Hapus Survei"
        description="Survei akan dihapus secara permanen. Tindakan ini tidak bisa dibatalkan."
        actionLabel="Ya, Hapus"
        isLoading={deleteSurvey.isPending}
        onConfirm={() => deleteSurvey.mutate(surveyId)}
      >
        <Button
          type="button"
          variant="destructive"
          className="cursor-pointer w-fit text-sm mb-2 bg-red-400"
        >
          {deleteSurvey.isPending ? 'Menghapus...' : 'Hapus Survei'}
        </Button>
      </ConfirmDeleteDialog>
      <div className="flex-grow">
        <div className="grid bg-primary-2/90 rounded-xl sm:p-10 p-5 lg:gap-5 gap-3">
          <SurveyForm
            surveyId={surveyId}
            initialData={initialData}
            onAutoSave={(formData: any) =>
              updateSurvey.mutate({ id: surveyId, data: formData })
            }
          />
        </div>
      </div>
    </>
  )
}
