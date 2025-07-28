'use client';

import { useState } from 'react';
import { TriangleAlert, ClipboardList, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { GeneratedSurveyStructure } from '@/features/.python-service/types/types';
import { SurveyQuestion } from './question-result-renderer';

interface Props {
  data: GeneratedSurveyStructure;
  isError?: boolean;
}

const formatNumberArrayToRange = (arr: number[]) => {
  const sorted = [...arr].sort((a, b) => a - b);
  return sorted.length === 1 ? sorted[0].toString() : `${sorted[0]}–${sorted[sorted.length - 1]}`;
};

export const GenerateSurveyResult = ({ data, isError }: Props) => {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const isKriteriaEmpty = (kriteria: Record<string, unknown>) => {
  return Object.values(kriteria).every((value) => {
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'string') return value.trim() === '';
    return !value;
  });
};
  const updateAnswer = (id: string, value: any) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  if (isError || 'error' in data) {
    return (
      <div
        className="flex justify-center items-center gap-2 text-red-400 font-medium text-sm border rounded-lg p-4"
        style={{
          background: 'var(--glass-background)',
          backdropFilter: 'var(--glass-blur)',
          borderColor: 'var(--glass-border)',
        }}
      >
        <TriangleAlert className="w-5 h-5 mt-0.5 text-red-400 shrink-0" />
        <span>
          {'error' in data ? data.error : 'Failed to generate survey. Please try again.'}
        </span>
      </div>
    );
  }

  return (
    <div className="sm:space-y-6 space-y-3 rounded-2xl p-4 min-h-40 border bg-glass-bg border-glass-border shadow-md backdrop-blur-md transition">
      <div className="flex flex-col gap-3 items-center">
        <h3 className="sm:text-2xl text-xl text-foreground font-bold">{data.judul}</h3>
        <p className="sm:text-base text-sm text-justify text-muted-foreground font-medium">{data.deskripsi}</p>
        <Badge variant="outline" className="w-fit gap-1 text-xs font-medium text-blue-700 border-blue-300 bg-blue-100">
          <Users className="w-4 h-4" />
          {data.jumlah_responden.toLocaleString()} respondents
        </Badge>
      </div>

      {data.kriteria && !isKriteriaEmpty(data.kriteria) && (
        <div className="space-y-2">
          <h4 className="text-xl font-semibold">Survey Criteria</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(data.kriteria).map(([key, value]) => {
              if (!value || (Array.isArray(value) && value.length === 0)) return null;

              const displayValue = Array.isArray(value)
                ? value.every((v) => typeof v === 'number')
                  ? formatNumberArrayToRange(value)
                  : value.join(', ')
                : String(value);

              return (
                <Badge
                  key={key}
                  variant="outline"
                  className="bg-secondary-1/10 dark:bg-secondary-1/20 text-muted-foreground border border-secondary-1/30 dark:border-secondary-1/40 backdrop-blur-sm px-3 py-1 text-xs font-medium flex items-start gap-1 break-words max-w-full whitespace-normal"
                >
                  <ClipboardList className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <div className="capitalize">
                    <span className="font-semibold">{key}:</span> <span>{displayValue}</span>
                  </div>
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h4 className="text-xl font-semibold">Survey Questions</h4>
        {data.PertanyaanSurvei.map((q, idx) => {
          const id = `q-${idx + 1}`;
          return (
            <SurveyQuestion
              key={id}
              id={id}
              question={q}
              value={answers[id]}
              onChange={(val) => updateAnswer(id, val)}
              index={idx}
            />
          );
        })}
      </div>
    </div>
  );
};
