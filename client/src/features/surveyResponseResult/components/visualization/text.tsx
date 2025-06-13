'use client';

import { ResponSummary } from '../../types';

interface TextAnswersChartProps {
  summary: ResponSummary;
}

export default function TextAnswersChart({ summary }: TextAnswersChartProps) {
  const answers = summary.summary as string[];

  return (
    <div className="w-full max-h-[300px] overflow-y-auto rounded-xl py-3 space-y-2 pr-2">
      {answers.length === 0 ? (
        <p className="text-gray-500 italic">Belum ada jawaban</p>
      ) : (
        answers.map((text, idx) => (
          <div
            key={idx}
            className="bg-gray-100 p-2 rounded text-sm text-gray-700"
          >
            {text}
          </div>
        ))
      )}
    </div>
  );
}
