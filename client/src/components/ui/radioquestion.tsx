"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface RadioQuestionProps {
  options: string[]
  value: string
  onChange: (value: string) => void
}

export default function RadioQuestion({
  options,
  value,
  onChange,
}: RadioQuestionProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="flex flex-col gap-4"
    >
      {options.map((option, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200 hover:border-blue-500 transition-all cursor-pointer"
        >
          <Label htmlFor={`option-${index}`} className="w-full cursor-pointer">
            {option}
          </Label>
          <RadioGroupItem
            value={option}
            id={`option-${index}`}
            className="peer"
          />
        </div>
      ))}
    </RadioGroup>
  )
}
