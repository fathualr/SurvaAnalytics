'use client'

import { useEffect, useRef, useState } from 'react'
import { useAutosave } from '@/hooks/useAutoSave'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { CheckboxQuestion } from './type/checkbox'
import { DropdownQuestion } from './type/dropdown'
import { RadioQuestion } from './type/radio'
import { ScaleQuestion } from './type/scale'
import { EssayQuestion } from './type/essay'
import { Card } from '@/components/ui/card'
import { Trash2 } from 'lucide-react'
import { QuestionType } from '../../types'

export interface QuestionCardProps {
  question: {
    id: string
    teks_pertanyaan: string
    tipe_pertanyaan: QuestionType
    opsi?: string[]
    is_required?: boolean
    index?: number
  }
  onChange: (id: string, updates: Partial<QuestionCardProps['question']>) => void
  onDelete: (id: string) => void
  isDeleting?: boolean
  disabled?: boolean
}

export function QuestionCard({
  question,
  onChange,
  onDelete,
  isDeleting = false,
  disabled = false,
}: QuestionCardProps) {
  const [localQuestion, setLocalQuestion] = useState(question)
  const hasMounted = useRef(false)

  const autosave = useAutosave<Partial<QuestionCardProps['question']>>(
    (updates) => {
      if (!disabled) {
        onChange(question.id, updates)
      }
    },
    3000
  )

  const sanitizeOptions = (opsi: string[]) => {
    return opsi.map((opt, i) => (opt.trim() === '' ? `Opsi ${i + 1}` : opt))
  }

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }

    const { teks_pertanyaan, tipe_pertanyaan, opsi, is_required } = localQuestion
    autosave({
      teks_pertanyaan,
      tipe_pertanyaan,
      opsi: opsi ? sanitizeOptions(opsi) : undefined,
      is_required,
    })
  }, [localQuestion])

  const handleInputChange = (
    field: keyof typeof localQuestion,
    value: any
  ) => {
    setLocalQuestion((prev) => ({ ...prev, [field]: value }))
  }

  const handleTypeChange = (val: QuestionType) => {
    if (val === 'skala') {
      setLocalQuestion((prev) => ({
        ...prev,
        tipe_pertanyaan: 'skala',
        opsi: prev.opsi ?? Array(5).fill(''),
      }))
    } else if (val === 'essay') {
      setLocalQuestion((prev) => ({
        ...prev,
        tipe_pertanyaan: 'essay',
        opsi: undefined,
      }))
    } else {
      setLocalQuestion((prev) => ({
        ...prev,
        tipe_pertanyaan: val,
        opsi: prev.opsi ?? ['', ''],
      }))
    }
  }

  return (
    <Card className="border sm:text-sm text-xs border-black rounded-lg gap-3 p-6 bg-accent-1">
      <div className="flex items-center justify-between w-full">
        {typeof question.index === 'number' && (
          <div className="sm:text-sm text-xs text-muted-foreground font-semibold">
            Pertanyaan {question.index}
          </div>
        )}
        <Button
          variant="ghost"
          onClick={() => onDelete(question.id)}
          disabled={isDeleting || disabled}
        >
          {isDeleting ? (
            <div className="animate-spin rounded-full border-2 border-black border-t-transparent size-5" />
          ) : (
            <Trash2 className="text-red-500/50 sm:size-5 size-4" />
          )}
        </Button>
      </div>

      <textarea
        value={localQuestion.teks_pertanyaan}
        onChange={(e) => handleInputChange('teks_pertanyaan', e.target.value)}
        placeholder="Tuliskan pertanyaan di sini"
        rows={1}
        className="sm:text-sm text-xs border rounded-lg p-3 h-auto resize-none overflow-hidden"
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement
          target.style.height = 'auto'
          target.style.height = `${target.scrollHeight}px`
        }}
        maxLength={500}
        disabled={disabled}
      />

      <div className="flex flex-col gap-2">
        <label className="sm:text-sm text-xs font-medium">Tipe Pertanyaan</label>
        <Select
          value={localQuestion.tipe_pertanyaan}
          onValueChange={(val) => handleTypeChange(val as QuestionType)}
          disabled={disabled}
        >
          <SelectTrigger className="md:w-40 w-full border-black sm:text-sm text-xs" disabled={disabled}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pilihan_ganda">Pilihan Ganda</SelectItem>
            <SelectItem value="checkbox">Checkbox</SelectItem>
            <SelectItem value="dropdown">Drop-down</SelectItem>
            <SelectItem value="skala">Skala</SelectItem>
            <SelectItem value="essay">Essay</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {localQuestion.tipe_pertanyaan === 'pilihan_ganda' && (
        <RadioQuestion
          opsi={localQuestion.opsi || ['']}
          onChange={(opsi) => handleInputChange('opsi', opsi)}
          disabled={disabled}
        />
      )}
      {localQuestion.tipe_pertanyaan === 'checkbox' && (
        <CheckboxQuestion
          opsi={localQuestion.opsi || ['']}
          onChange={(opsi) => handleInputChange('opsi', opsi)}
          disabled={disabled}
        />
      )}
      {localQuestion.tipe_pertanyaan === 'dropdown' && (
        <DropdownQuestion
          opsi={localQuestion.opsi || ['']}
          onChange={(opsi) => handleInputChange('opsi', opsi)}
          disabled={disabled}
        />
      )}
      {localQuestion.tipe_pertanyaan === 'skala' && (
        <ScaleQuestion
          options={localQuestion.opsi || Array(5).fill('')}
          onChange={(opsi) => handleInputChange('opsi', opsi)}
          disabled={disabled}
        />
      )}
      {localQuestion.tipe_pertanyaan === 'essay' && (
        <EssayQuestion disabled={disabled} />
      )}

      <div className="flex items-center space-x-2 mt-2">
        <Checkbox
          id={`required-${question.id}`}
          checked={localQuestion.is_required}
          onCheckedChange={(checked) =>
            handleInputChange('is_required', !!checked)
          }
          disabled={disabled}
        />
        <label
          htmlFor={`required-${question.id}`}
          className="sm:text-sm text-xs font-medium leading-none"
        >
          Wajib diisi
        </label>
      </div>
    </Card>
  )
}
