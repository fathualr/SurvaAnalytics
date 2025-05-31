// components/survey/client/QuestionRenderer.tsx
import RadioQuestion from "../ui/radioquestion"
import { Question } from "./types"

interface Props {
  question: Question
  answer: string | string[]
  onAnswer: (val: string | string[]) => void
}

export default function QuestionRenderer({ question, answer, onAnswer }: Props) {
  switch (question.type) {
    case "radio":
      return (
        <RadioQuestion
          options={question.options}
          value={answer as string}
          onChange={(val) => onAnswer(val)}
        />
      )
    case "checkbox":
      return <div>Checkbox belum dibuat</div>
    default:
      return <p>Jenis pertanyaan tidak dikenali</p>
  }
}
