'use client'

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/umum/confirm-dialog'
import { SurveyForm } from './survey-form'
import {
  useUserSurvey,
  useUpdateUserSurvey,
  useDeleteUserSurvey,
} from '@/features/survey/hooks/useUserSurveys'
import { QuestionSection } from '@/features/surveyQuestion/components/user/question-section'
import SubmitButton from '@/features/surveyVerification/components/user/submit-button'
import { useSurveyQuestions } from '@/features/surveyQuestion/hooks/useUserSurveyQuestion'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { CreateSurveyPaymentButton } from '@/features/surveyPayment/components/payment-button'

interface SurveyContainerProps {
  surveyId: string
}

export function SurveyContainer({ surveyId }: SurveyContainerProps) {
  const router = useRouter()
  const { isLoggedIn, loading: authLoading } = useAuth()
  const shouldFetch = isLoggedIn && !authLoading
  const { data: survey, isLoading, isError, error } = useUserSurvey(surveyId, shouldFetch)
  const updateSurvey = useUpdateUserSurvey()
  const deleteSurvey = useDeleteUserSurvey()
  const isEditable = survey?.status === 'draft' || survey?.status === 'rejected'
  const { data: fullQuestionResponse } = useSurveyQuestions(surveyId, shouldFetch);
  const totalQuestions = fullQuestionResponse?.data?.length ?? 0;

  const stableKriteria = useMemo(() => survey?.kriteria ?? {}, [JSON.stringify(survey?.kriteria)])

  const initialForm = useMemo(() => ({
    judul: survey?.judul,
    deskripsi: survey?.deskripsi ?? '',
    kriteria: stableKriteria,
    jumlah_responden: survey?.jumlah_responden,
    tanggal_mulai: survey?.tanggal_mulai,
    tanggal_berakhir: survey?.tanggal_berakhir,
    status: survey?.status,
    umpan_balik: survey?.umpan_balik,
  }), [
    survey?.judul,
    survey?.deskripsi,
    survey?.jumlah_responden,
    survey?.tanggal_mulai,
    survey?.tanggal_berakhir,
    survey?.status,
    survey?.umpan_balik,
    stableKriteria,
  ])

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

  if (!shouldFetch) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-pulse text-gray-500 text-sm">Menyiapkan akses...</div>
      </div>
    );
  }

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
      <div className="flex justify-between">
        <ConfirmDialog
          title="Hapus Survei"
          description="Survei akan dihapus secara permanen."
          actionLabel="Ya, Hapus"
          isLoading={deleteSurvey.isPending}
          onConfirm={() => deleteSurvey.mutate(surveyId)}
          actionClassName="bg-red-400 hover:bg-red-500"
        >
          <Button className="w-fit sm:text-sm text-xs mb-2 bg-red-400" variant="destructive">
            Hapus Survei
          </Button>
        </ConfirmDialog>

        {(survey.status === 'draft' || survey.status === 'rejected') &&
          totalQuestions > 0 && (
            <SubmitButton surveiId={surveyId} />
        )}

        {survey.status === 'payment_pending' && (
          <CreateSurveyPaymentButton surveyId={surveyId} />
        )}
      </div>

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
