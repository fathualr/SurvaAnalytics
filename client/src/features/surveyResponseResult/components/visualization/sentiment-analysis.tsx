'use client';

import { useSentimentSummary } from '@/features/.pythonService/hooks';
import { Smile, Meh, Frown } from 'lucide-react';

export default function SentimentAnalysis({ texts }: { texts: string[] }) {
  const { data, isLoading, isError } = useSentimentSummary(texts);

  if (isLoading) return <div className="text-center text-muted-foreground italic">Memuat analisis...</div>;
  if (isError || !data) return <div className="text-center text-destructive">Gagal memuat data sentimen.</div>;

const { summary } = data;
const total = summary.positive + summary.neutral + summary.negative;

const toPercent = (value: number) => {
  return total === 0 ? 0 : ((value / total) * 100).toFixed(1);
};

return (
  <div className="flex w-full h-full justify-around items-center md:text-xl sm:text-lg text-base font-medium">
    <div className="flex flex-col items-center text-green-600">
      <Smile className="w-6 h-6 mb-1" />
      <span>Positif</span>
      <span className="font-bold">{toPercent(summary.positive)}%</span>
    </div>

    <div className="flex flex-col items-center text-yellow-500">
      <Meh className="w-6 h-6 mb-1" />
      <span>Netral</span>
      <span className="font-bold">{toPercent(summary.neutral)}%</span>
    </div>

    <div className="flex flex-col items-center text-red-500">
      <Frown className="w-6 h-6 mb-1" />
      <span>Negatif</span>
      <span className="font-bold">{toPercent(summary.negative)}%</span>
    </div>
  </div>
  );
}
