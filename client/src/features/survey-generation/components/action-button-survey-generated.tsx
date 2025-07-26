'use client';

import { Button } from '@/components/ui/button';
import { Eraser } from 'lucide-react';

interface ActionButtonSurveyGeneratedProps {
  onClear: () => void;
}

export const ActionButtonSurveyGenerated = ({ onClear }: ActionButtonSurveyGeneratedProps) => {
  return (
    <div 
      className="inline-flex rounded-xl overflow-hidden border backdrop-blur-md text-sm text-foreground divide-x w-full"
      style={{
        background: 'var(--glass-background)',
        borderColor: 'var(--glass-border)',
        boxShadow: 'var(--glass-shadow)',
        backdropFilter: 'var(--glass-blur)',
      }}
    >
      <Button
        variant="default"
        onClick={onClear}
        className="flex items-center gap-2 px-4 py-2 transition-none rounded-none text-red-500 bg-red-500/20 hover:bg-red-500/30 flex-1 basis-40 min-w-0"
      >
        <Eraser className="w-4 h-4 shrink-0" />
        <span className="truncate">Clear Result</span>
      </Button>
    </div>
  );
};
