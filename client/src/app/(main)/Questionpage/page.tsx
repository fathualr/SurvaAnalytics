"use client";

import { Progress } from "@/components/survey/survey-progres";
import SurveyQuestion from "@/components/survey/survey-question";

export default function QuestionPage() {
  const currentIndex = 0;
  const total = 5;
  const surveyTitle = "Survei Pulau jawa";
  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <div className="grid grid-cols-1 w-full px-20 py-10">
      <div className="col-span-1 gap-4 flex justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">{surveyTitle}</h2>
        <div className="w-1/2">
          <Progress value={progress} />
        </div>

      </div>
    </div>
  );
}
