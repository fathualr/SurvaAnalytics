import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface pilihangandabanyak {
  question: {
    id: string
    text: string
    options: string[]
    required?: boolean
  }
  onNext: (answer: string) => void
}

export default function MultipleChoiceQuestion({
  question,
  onNext,
}: pilihangandabanyak) {
  const [selected, setSelected] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = () => {
    if (question.required && !selected) {
      setError("Harap pilih salah satu jawaban.")
    } else {
      setError(null)
      onNext(selected)
    }
  }

  return (
    <div className="space-y-6 bg-[#eaf3fc] p-6 rounded-md max-w-xl mx-auto">
      <div>
        <h2 className="font-semibold text-gray-700 mb-2">Question</h2>
        <p className="text-lg font-bold text-black">{question.text}</p>
      </div>

      <RadioGroup
        value={selected}
        onValueChange={setSelected}
        className="space-y-2"
      >
        {question.options.map((option, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-3 p-2 bg-white rounded-md border"
          >
            <RadioGroupItem value={option} id={option} />
            <Label htmlFor={option}>{option}</Label>
          </div>
        ))}
      </RadioGroup>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button onClick={handleSubmit}>Lanjut</Button>
    </div>
  )
}
