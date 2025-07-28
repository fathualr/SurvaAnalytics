'use client';

import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

interface PromptSuggestion {
  title: string;
  prompt: string;
  icon?: string;
}

interface PromptSuggestionGridProps {
  onSelect: (prompt: string) => void;
  className?: string;
  isDisabled?: boolean;
}

export const PromptSuggestionGrid = ({
  onSelect,
  className,
  isDisabled
}: PromptSuggestionGridProps) => {
  const [prompts, setPrompts] = useState<PromptSuggestion[]>([]);
  const [refreshCount, setRefreshCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const suggestions = useMemo(() => {
    const shuffled = [...prompts].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
  }, [prompts, refreshCount]);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const res = await fetch('/data/prompts.json');
        const data = await res.json();
        setPrompts(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch prompts:', err);
      }
    };
    fetchPrompts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(true);
      setTimeout(() => {
        setRefreshCount((prev) => prev + 1);
        setLoading(false);
      }, 800);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn('w-full space-y-4', className)}>
      <h3 className="text-xl font-bold text-foreground">Suggested Survey Topics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3 gap-2">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl p-4 min-h-40 border border-glass-border bg-glass-bg backdrop-blur-md shadow-md"
              style={{
                borderColor: 'var(--glass-border)',
                boxShadow: 'var(--glass-shadow)',
                backdropFilter: 'var(--glass-blur)',
              }}
            >
              <div className="h-4 w-1/2 bg-muted rounded mb-2" />
              <div className="h-3 w-full bg-muted/50 rounded" />
            </div>
          ))
        : suggestions.map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              if (!isDisabled) onSelect(item.prompt);
            }}
            className={cn(
              `cursor-pointer rounded-2xl p-4 min-h-40 border border-glass-border bg-glass-bg backdrop-blur-md shadow-md hover:shadow-lg transition flex flex-col justify-between`,
              isDisabled && `pointer-events-none opacity-75`
            )}
            style={{
              background: 'var(--glass-background)',
              borderColor: 'var(--glass-border)',
              boxShadow: 'var(--glass-shadow)',
              backdropFilter: 'var(--glass-blur)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{item.icon ?? '🧠'}</span>
              <span className="text-md font-semibold text-foreground">{item.title}</span>
            </div>

            <div className="flex flex-1 items-center justify-center overflow-hidden">
              <p className="text-sm text-muted-foreground text-center line-clamp-3">
                “{item.prompt}”
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
