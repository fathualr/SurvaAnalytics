'use client';

import { useWordCloudImage } from '@/features/.pythonService/hooks';

export default function WordCloudVisualization({ texts }: { texts: string[] }) {
  const { data: imageUrl, isLoading, isError } = useWordCloudImage(texts);

  if (isLoading) return <div className="text-center text-muted-foreground italic">Memuat wordcloud...</div>;
  if (isError || !imageUrl) return <div className="text-center text-destructive">Gagal memuat wordcloud.</div>;

  return (
    <div className="flex justify-center items-center">
      <img
        src={imageUrl}
        alt="WordCloud"
        className="max-w-full rounded-md"
      />
    </div>
  );
}
