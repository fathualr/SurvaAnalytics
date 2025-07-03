'use client';

import { useWordCloudImage } from '@/features/.python-service/hooks/useUserPythonService';

export default function WordCloudVisualization({ texts }: { texts: string[] }) {
  const { data: imageUrl, isLoading, isError } = useWordCloudImage(texts);

  if (isLoading)
    return (
      <div className="text-center text-muted-foreground italic text-sm">
        Loading word cloud...
      </div>
    );

  if (isError || !imageUrl)
    return (
      <div className="text-center text-destructive text-sm">
        Failed to load word cloud.
      </div>
    );

  return (
    <div className="flex justify-center items-center">
      <img
        src={imageUrl}
        alt="Word Cloud Visualization"
        className="max-w-full max-h-[350px] object-contain rounded-lg"
      />
    </div>
  );
}
