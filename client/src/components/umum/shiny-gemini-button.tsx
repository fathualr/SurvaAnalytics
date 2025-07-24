'use client';

import { cn } from '@/lib/utils';
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ShinyGeminiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

export const ShinyGeminiButton = ({
  className,
  children,
  ...props
}: ShinyGeminiButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        'shine-object text-foreground font-bold rounded-xl',
        'relative cursor-pointer overflow-hidden flex items-center justify-center gap-3',
        'border border-glass-border bg-glass-bg backdrop-blur-md shadow-lg transition hover:shadow-xl hover:scale-[1.03] duration-500',
        'before:absolute before:inset-0 before:content-[\'\'] before:pointer-events-none',
        className
      )}
      style={{
        background: 'linear-gradient(90deg, #9168C0 0%, #5684D1 50%, #1BA1E3 100%)',
        boxShadow: 'var(--glass-shadow)',
        backdropFilter: 'var(--glass-blur)',
      }}
    >
      {children}
    </button>
  );
};
