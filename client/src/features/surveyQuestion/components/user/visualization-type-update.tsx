'use client';

import { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useUpdateVisualizationType } from '../../hooks/useUserSurveyQuestion';
import { UpdateVisualizationTypeSurveyQuestionPayload, VisualizationType } from '../../types';

interface VisualizationTypeSelectProps {
  questionId: string;
  surveiId: string;
  defaultValue: string;
  tipePertanyaan: string;
}

export function VisualizationTypeSelect({
  questionId,
  surveiId,
  defaultValue,
  tipePertanyaan,
}: VisualizationTypeSelectProps) {
  const [value, setValue] = useState(defaultValue);
  const { mutate, isPending } = useUpdateVisualizationType(surveiId);

  const handleChange = (newType: string) => {
    setValue(newType);
    const payload: UpdateVisualizationTypeSurveyQuestionPayload = {
      tipe_visualisasi: newType as VisualizationType,
    };
    mutate({ id: questionId, payload });
  };

  const chartOptions =
    tipePertanyaan === 'essay'
      ? ['text', 'wordcloud', 'sentiment_analysis']
      : ['pie', 'bar', 'doughnut', 'radar'];

  return (
    <div className="sm:max-w-xs w-full">
      <Label htmlFor="chart-select" className="mb-2 block">
        Pilih chart
      </Label>
      <Select value={value} onValueChange={handleChange} disabled={isPending}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Pilih chart" />
        </SelectTrigger>
        <SelectContent>
          {chartOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option
                .replace('_', ' ')
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
