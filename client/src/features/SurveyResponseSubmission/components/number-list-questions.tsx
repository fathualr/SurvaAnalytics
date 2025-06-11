'use client';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface QuestionStepperProps {
  questions: { id: string }[];
  currentStep: number;
  answers: Record<string, any>;
  onNavigate: (index: number) => void;
}

export function NumberListQuestions({
  questions,
  currentStep,
  answers,
  onNavigate,
}: QuestionStepperProps) {
  return (
    <div className="flex justify-center w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="bg-accent-1 border text-[#232323] hover:bg-accent-1/30">
              <span className="block sm:hidden">Navigasi</span>
              <span className="hidden sm:block">Navigasi Pertanyaan</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="max-h-40 md:w-160 sm:w-120 w-60 overflow-y-auto space-y-2 z-9">
          <div className="grid md:grid-cols-10 grid-cols-5 gap-2">
            {questions.map((q, idx) => (
              <Button
                key={q.id}
                size="sm"
                variant="ghost"
                className={`rounded border text-xs px-0 py-2 ${
                  idx === currentStep
                    ? 'bg-primary-2 text-white'
                    : answers[q.id]
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
                onClick={() => onNavigate(idx)}
              >
                {idx + 1}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
