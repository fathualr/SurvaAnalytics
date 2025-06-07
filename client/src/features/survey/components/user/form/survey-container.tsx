'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ConfirmDeleteDialog } from '@/components/umum/confirm-delete-dialog'
import { SurveyForm } from './survey-form'
import {
  useUserSurvey,
  useUpdateUserSurvey,
  useDeleteUserSurvey,
} from '@/features/survey/hooks/useUserSurveys'
import { QuestionSection } from '@/features/surveyQuestion/components/user/question-section'

interface SurveyContainerProps {
  surveyId: string
}

export function SurveyContainer({ surveyId }: SurveyContainerProps) {
  const router = useRouter()
  const { data: survey, isLoading, isError, error } = useUserSurvey(surveyId)
  const updateSurvey = useUpdateUserSurvey()
  const deleteSurvey = useDeleteUserSurvey()
  const isEditable = survey?.status === 'draft' || survey?.status === 'rejected'

  const initialForm = {
    judul: survey?.judul,
    deskripsi: survey?.deskripsi ?? '',
    kriteria: survey?.kriteria ?? {},
    jumlah_responden: survey?.jumlah_responden,
    tanggal_mulai: survey?.tanggal_mulai,
    tanggal_berakhir: survey?.tanggal_berakhir,
    status: survey?.status,
    umpan_balik: survey?.umpan_balik,
  }

  useEffect(() => {
    if (updateSurvey.isSuccess) toast.success('Perubahan survei disimpan')
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

  if (isError || !survey) {
    return (
      <div className="flex justify-center items-center min-h-[300px] text-red-600 text-sm">
        Gagal memuat data survei: {error?.message || 'Unknown error'}
      </div>
    )
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
          className="cursor-pointer w-fit sm:text-sm text-xs mb-2 bg-red-400"
        >
          {deleteSurvey.isPending ? 'Menghapus...' : 'Hapus Survei'}
        </Button>
      </ConfirmDeleteDialog>

      <div className="flex-grow">
        <div className="grid bg-accent-1 rounded-xl sm:p-10 p-5 lg:gap-5 gap-3 border border-black sm:text-sm text-xs">
          <SurveyForm
            surveyId={surveyId}
            initialData={initialForm}
            onAutoSave={(formData: any) =>
              updateSurvey.mutate({ id: surveyId, data: formData })
            }
            disabled={!isEditable}
          />

          <h2 className="text-xl font-semibold p-3 mx-auto">Pertanyaan Survei</h2>
          
          <QuestionSection surveyId={surveyId} isEditable={isEditable} />
        </div>
      </div>
    </>
  )
}
