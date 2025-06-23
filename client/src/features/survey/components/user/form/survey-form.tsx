'use client'

import { useState, useRef, useEffect } from 'react'
import { isEqual } from 'lodash'
import { Input } from '@/components/ui/input'
import { KriteriaSection } from './kriteria-section'
import { UpdateUserSurveiPayload } from '@/features/survey/types'
import { DateRangeSection } from '@/components/umum/form/date-range-input'
import { FormGroup } from '@/components/umum/form/form-group'
import { useAutosave } from '@/hooks/useAutoSave'

interface SurveyFormProps {
  surveyId: string
  initialData: UpdateUserSurveiPayload
  onAutoSave: (data: UpdateUserSurveiPayload) => void
  disabled?: boolean
}

function isValidDateRange(start?: string, end?: string) {
  if (!start || !end) return false
  return new Date(start) <= new Date(end)
}

export function SurveyForm({
  surveyId,
  initialData,
  onAutoSave,
  disabled = false,
}: SurveyFormProps) {
  const [localForm, setLocalForm] = useState(initialData)
  const [lastSavedForm, setLastSavedForm] = useState(initialData)
  const isMounted = useRef(false)

  const autosave = useAutosave((data: UpdateUserSurveiPayload) => {
    if (!disabled) {
      onAutoSave(data)
      setLastSavedForm(data)
    }
  }, 3000)

  useEffect(() => {
    if (!isEqual(initialData, localForm)) {
      setLocalForm(initialData)
      setLastSavedForm(initialData)
    }
  }, [initialData])

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }

    const { status, umpan_balik, ...formToSave } = localForm
    const { status: _, umpan_balik: __, ...lastSaved } = lastSavedForm

    if (
      !isEqual(formToSave, lastSaved) &&
      isValidDateRange(formToSave.tanggal_mulai, formToSave.tanggal_berakhir)
    ) {
      autosave(formToSave)
    }
  }, [localForm])

  const handleChange = <K extends keyof UpdateUserSurveiPayload>(
    field: K,
    value: UpdateUserSurveiPayload[K]
  ) => {
    if (!disabled) {
      setLocalForm((prev) => {
        if (isEqual(prev[field], value)) return prev
        return { ...prev, [field]: value }
      })
    }
  }

  return (
    <form className="flex flex-col gap-5">
      {localForm.status === 'rejected' && localForm.umpan_balik && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-5">
          <strong className="font-bold block">Umpan Balik</strong>
          <span>{localForm.umpan_balik}</span>
        </div>
      )}

      <section className="border border-black bg-accent-1 md:px-5 px-3 md:py-3 py-1 rounded-xl flex flex-col gap-3">
        <h2 className="text-xl font-semibold mb-2">Informasi Umum</h2>
        <FormGroup label="Judul Survei" htmlFor="judul">
          <Input
            id="judul"
            value={localForm.judul}
            onChange={(e) => handleChange('judul', e.target.value)}
            placeholder="Contoh: Survei Kepuasan Pelanggan 2025"
            className="sm:text-sm text-xs"
            maxLength={255}
            disabled={disabled}
          />
        </FormGroup>
        <FormGroup label="Deskripsi Survei" htmlFor="deskripsi">
          <textarea
            id="deskripsi"
            value={localForm.deskripsi}
            onChange={(e) => handleChange('deskripsi', e.target.value)}
            rows={4}
            placeholder="Tuliskan tujuan dan isi singkat dari survei ini..."
            className="w-full sm:text-sm text-xs border rounded-lg p-3 resize-none overflow-hidden"
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement
              target.style.height = 'auto'
              target.style.height = `${target.scrollHeight}px`
            }}
            disabled={disabled}
          />
        </FormGroup>
      </section>

      <section className="border border-black bg-accent-1 md:px-5 px-3 md:py-3 py-1 rounded-xl flex flex-col gap-3">
        <h2 className="text-xl font-semibold mb-2">Ketentuan Survei</h2>
        <DateRangeSection
          startDate={localForm.tanggal_mulai || ''}
          endDate={localForm.tanggal_berakhir || ''}
          onChange={({ startDate, endDate }) => {
            handleChange('tanggal_mulai', startDate)
            handleChange('tanggal_berakhir', endDate)
          }}
          disabled={disabled}
        />
        <FormGroup label="Jumlah Responden" htmlFor="jumlah_responden">
          <Input
            id="jumlah_responden"
            type="number"
            min="1"
            value={localForm.jumlah_responden}
            onChange={(e) => handleChange('jumlah_responden', e.target.value)}
            placeholder="Jumlah kuota respons"
            className="bg-none sm:text-sm text-xs"
            disabled={disabled}
          />
        </FormGroup>
      </section>

      <section className="border border-black bg-accent-1 md:px-5 px-3 md:py-3 py-1 rounded-xl flex flex-col gap-3">
        <h2 className="text-xl font-semibold mb-2">Kriteria Responden</h2>
        <KriteriaSection
          kriteria={localForm.kriteria || {}}
          onChange={(updatedKriteria) => handleChange('kriteria', updatedKriteria)}
          disabled={disabled}
        />
      </section>
    </form>
  )
}
