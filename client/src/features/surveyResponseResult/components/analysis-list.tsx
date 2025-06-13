'use client';

import { useResponSurveiSummary } from '../hooks/useUserSurveyResponseresult';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { VisualRenderer } from './visual-renderer';
import { VisualizationTypeSelect } from '@/features/surveyQuestion/components/user/visualization-type-update';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface AnalysisListProps {
  surveyId: string;
}

export const AnalysisList = ({ surveyId }: AnalysisListProps) => {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const shouldFetch = isLoggedIn && !authLoading;
  const { data, isLoading, isError } = useResponSurveiSummary(surveyId, shouldFetch);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-36 w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-sm text-red-500">
        Gagal memuat data analisis.
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="text-muted-foreground italic text-sm">
        Belum ada ringkasan tersedia untuk survei ini.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {data.map((summary) => (
        <Card key={summary.id_pertanyaan} className="w-full border border-black rounded-xl p-4 space-y-4">
          <div className="font-semibold text-sm flex items-start gap-2">
            <span>{summary.index}.</span>
            <span className="break-words whitespace-pre-wrap">{summary.teks_pertanyaan}</span>
          </div>

          <VisualizationTypeSelect
            questionId={summary.id_pertanyaan}
            surveiId={surveyId}
            defaultValue={summary.tipe_visualisasi}
            tipePertanyaan={summary.tipe_pertanyaan}
          />

          <CardContent className="flex justify-center p-0 text-sm w-full h-full min-h-[250px] max-h-[300px]">
            <VisualRenderer summary={summary} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
