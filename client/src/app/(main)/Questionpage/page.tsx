// app/survei/[id]/page.tsx
import SurveyContainer from "@/components/survey/survey-countainer"
import { Survey } from "@/components/survey/types"

const dummySurvey: Survey = {
  id: "1",
  title: "Survei Pulau Jawa",
  questions: [
    {
      id: "q1",
      type: "radio",
      text: "Apakah Orang jawa barat dapat menekuk tangan 90°",
      options: ["Tentu saja", "Bisa", "Bisa jadi", "Kemungkinan tidak", "tidak"],
      required: true,
    },
    {
      id: "q2",
      type: "radio",
      text: "Apakah Orang jawa barat dapat menekuk tangan 180°",
      options: ["Tentu saja", "Bisa", "Bisa jadi", "Kemungkinan tidak", "tidak"],
      required: true,
    },
  ],
}

export default function SurveyPage() {
  return <SurveyContainer survey={dummySurvey} />
}
