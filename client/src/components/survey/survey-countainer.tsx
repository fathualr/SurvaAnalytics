// components/survey/client/SurveyContainer.tsx
"use client";

import { useState } from "react";
import { Survey } from "./types";
import SurveyLayout from "./survey-layout";
import QuestionRenderer from "./survey-renderquestion";

export default function SurveyContainer({ survey }: { survey: Survey }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  const current = survey.questions[index];
  const isLast = index === survey.questions.length - 1;
  const [error, setError] = useState<string | null>(null);

  const handleAnswer = (val: string | string[]) => {
    setError(null); // reset error
    setAnswers((prev) => ({ ...prev, [current.id]: val }));
  };

  return (
    <SurveyLayout
      title={survey.title}
      progress={Math.round(((index + 1) / survey.questions.length) * 100)}
      timer="10:00"
        error={error}
      questionNumber={index + 1}
      questionText={current.text}
      onPrev={() => setIndex((i) => Math.max(i - 1, 0))}
      onNext={() => {
        const currentAnswer = answers[current.id];

        if (
          current.required &&
          (!currentAnswer || currentAnswer.length === 0)
        ) {
          setError("Harap pilih salah satu jawaban sebelum lanjut.");
          return;
        }

        setError(null);
        setIndex((i) => i + 1);
      }}
      onFinish={() => console.log("Kirim ke backend:", answers)}
      isLast={isLast}
    >
      <QuestionRenderer
        question={current}
        answer={answers[current.id] || ""}
        onAnswer={handleAnswer}
      />
    </SurveyLayout>
  );
}
