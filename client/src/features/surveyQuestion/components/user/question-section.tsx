'use client'

import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { QuestionCard } from '@/features/surveyQuestion/components/user/question-card'
import {
  useInfiniteSurveyQuestions,
  useCreateSurveyQuestion,
  useUpdateSurveyQuestion,
  useDeleteSurveyQuestion,
} from '@/features/surveyQuestion/hooks/useUserSurveyQuestion'
import { SurveyQuestion, UpdateSurveyQuestionPayload } from '@/features/surveyQuestion/types'
import { defaultSurveyQuestionPayload } from '@/features/surveyQuestion/constants'

interface QuestionSectionProps {
  surveyId: string
  isEditable: boolean
}

export function QuestionSection({ surveyId, isEditable }: QuestionSectionProps) {
  const {
    data,
    totalCount,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
  } = useInfiniteSurveyQuestions(surveyId)

  const createQuestion = useCreateSurveyQuestion(surveyId)
  const updateQuestion = useUpdateSurveyQuestion(surveyId)
  const deleteQuestion = useDeleteSurveyQuestion(surveyId)

  const handleAddQuestion = () => {
    createQuestion.mutate(defaultSurveyQuestionPayload, {
      onSuccess: () => toast.success('Pertanyaan berhasil ditambahkan'),
      onError: () => toast.error('Gagal menambahkan pertanyaan'),
    })
  }

  const handleUpdateQuestion = (id: string, updates: Partial<UpdateSurveyQuestionPayload>) => {
    updateQuestion.mutate({ id, payload: updates }, {
      onSuccess: () => toast.success('Perubahan pertanyaan disimpan'),
      onError: () => toast.error('Gagal menyimpan perubahan'),
    })
  }

  const handleDeleteQuestion = (id: string) => {
    deleteQuestion.mutate(id, {
      onSuccess: () => toast.success('Pertanyaan dihapus'),
      onError: () => toast.error('Gagal menghapus pertanyaan'),
    })
  }

  const allQuestions = data?.pages.flatMap(page => page.data) ?? []

  if (isLoading) {
    return <div className="text-xs w-full text-center">Memuat pertanyaan survei...</div>
  }

  if (isError) {
    return (
      <div className="text-xs w-full text-center text-red-500">
        Gagal memuat pertanyaan: {error?.message || 'Unknown error'}
      </div>
    )
  }

  if (allQuestions.length === 0) {
    return (
      <div className="text-xs w-full text-center">
        Belum ada pertanyaan. Tambahkan pertanyaan pertama Anda.
        <div className="mt-2">
          <Button
            variant="outline"
            onClick={handleAddQuestion}
            disabled={createQuestion.isPending || !isEditable}
          >
            {createQuestion.isPending ? 'Menambahkan...' : 'Tambah Pertanyaan'}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {allQuestions.map((q: SurveyQuestion) => (
        <QuestionCard
          key={q.id}
          question={{
            id: q.id,
            teks_pertanyaan: q.teks_pertanyaan,
            tipe_pertanyaan: q.tipe_pertanyaan,
            opsi: q.opsi || [],
            is_required: q.is_required,
            index: q.index,
          }}
          onChange={handleUpdateQuestion}
          onDelete={handleDeleteQuestion}
          isDeleting={deleteQuestion.isPending && deleteQuestion.variables === q.id}
          disabled={!isEditable}
        />
      ))}

      {hasNextPage && (
        <div className="flex flex-col w-full items-center gap-2 mb-4">
          <span className="text-xs text-muted-foreground">
            Menampilkan {allQuestions.length} dari {totalCount} pertanyaan
            ({totalCount - allQuestions.length} belum ditampilkan)
          </span>
          <Button
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="w-fit sm:text-sm text-xs"
          >
            {isFetchingNextPage ? 'Memuat...' : 'Muat lebih banyak'}
          </Button>
        </div>
      )}

      <Button
        variant="outline"
        className="w-fit mb-4 sm:text-sm text-xs"
        onClick={handleAddQuestion}
        disabled={createQuestion.isPending}
        hidden={!isEditable}
      >
        {createQuestion.isPending ? 'Menambahkan...' : 'Tambah Pertanyaan'}
      </Button>
    </>
  )
}
