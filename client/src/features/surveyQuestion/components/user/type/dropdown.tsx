'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Props {
  opsi: string[]
  onChange: (opsi: string[]) => void
  disabled?: boolean
}

export function DropdownQuestion({ opsi, onChange, disabled = false }: Props) {
  const addOption = () => {
    if (!disabled) {
      const newIndex = opsi.length + 1
      onChange([...opsi, `Opsi ${newIndex}`])
    }
  }

  const removeOption = (index: number) => {
    if (!disabled) {
      const newOptions = opsi.filter((_, i) => i !== index)
      onChange(newOptions)
    }
  }

  const updateOption = (index: number, value: string) => {
    if (!disabled) {
      const newOptions = [...opsi]
      newOptions[index] = value
      onChange(newOptions)
    }
  }

  const handleBlur = (index: number, value: string) => {
    if (!disabled && value.trim() === "") {
      const newOptions = [...opsi]
      newOptions[index] = `Opsi ${index + 1}`
      onChange(newOptions)
    }
  }

  return (
    <div className="space-y-2">
      <p className="font-semibold">Dropdown</p>
      {opsi.map((opt, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-6 text-center font-medium">{i + 1}.</span>
          <Input
            value={opt}
            onChange={(e) => updateOption(i, e.target.value)}
            onBlur={(e) => handleBlur(i, e.target.value)}
            placeholder={`Opsi ${i + 1}`}
            className="md:w-1/2 w-full sm:text-sm text-xs"
            disabled={disabled}
          />
          {!disabled && opsi.length > 1 && (
            <Button variant="ghost" size="sm" onClick={() => removeOption(i)}>
              <img src="/icons/managesurvey/x.svg" className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      {!disabled && (
        <Button variant="outline" size="sm" className="sm:text-sm text-xs" onClick={addOption}>
          Tambah Opsi
        </Button>
      )}
    </div>
  )
}
