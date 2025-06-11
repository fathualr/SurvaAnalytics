'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { NumberListQuestions } from './number-list-questions';

interface Question {
  id: string;
  teks_pertanyaan: string;
  is_required: boolean;
}

interface SurveyNavigationProps {
  questions: Question[];
  currentStep: number;
  setCurrentStep: (index: number) => void;
  answers: Record<string, any>;
  onSubmit: () => void;
}

export function SurveyNavigation({
  questions,
  currentStep,
  setCurrentStep,
  answers,
  onSubmit,
}: SurveyNavigationProps) {
  const [open, setOpen] = useState(false);

  const requiredUnanswered = questions.filter(
    (q) => q.is_required && !answers[q.id]
  );
  const optionalUnanswered = questions.filter(
    (q) => !q.is_required && !answers[q.id]
  );

  const isFinalStep = currentStep === questions.length - 1;
  const isFirstStep = currentStep === 0;
  const isDisabled = requiredUnanswered.length > 0;

  const handleNext = () => {
    if (!isFinalStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex justify-between items-center gap-2">
        <Button
          onClick={handlePrev}
          className="bg-primary-2 hover:bg-primary-2/80 text-white w-full max-w-[120px] px-4 py-2 rounded-md"
          disabled={isFirstStep}
        >
          <span className="block sm:hidden">&lt;</span>
          <span className="hidden sm:block">&lt; Sebelumnya</span>
        </Button>

        <NumberListQuestions
          questions={questions}
          currentStep={currentStep}
          answers={answers}
          onNavigate={(idx) => setCurrentStep(idx)}
        />

        {!isFinalStep ? (
          <Button
            onClick={handleNext}
            className="bg-primary-2 hover:bg-primary-2/80 text-white w-full max-w-[120px] px-4 py-2 rounded-md"
          >
            <span className="block sm:hidden">&gt;</span>
            <span className="hidden sm:block">Selanjutnya &gt;</span>
          </Button>
        ) : (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-secondary-1 hover:bg-secondary-1/80 text-[#232323] w-full max-w-[120px] px-6 py-2 rounded-md"
                disabled={isDisabled}
                onClick={() => {
                  if (!isDisabled) setOpen(true);
                }}
              >
                Selesai
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Yakin ingin mengirim jawaban?</DialogTitle>
              </DialogHeader>

              {isDisabled ? (
                <p className="text-red-500 font-medium">
                  ⚠️ Masih ada {requiredUnanswered.length} pertanyaan wajib yang belum dijawab.
                </p>
              ) : (
                <p className="text-gray-600">
                  Semua pertanyaan wajib telah dijawab. Pertanyaan tidak wajib dapat dilewati.
                </p>
              )}

              {optionalUnanswered.length > 0 && (
                <div className="mt-3 text-sm text-gray-700">
                  <p>Pertanyaan tidak wajib yang belum dijawab:</p>
                  <ul className="mt-1 list-disc list-inside max-h-32 overflow-auto text-gray-500">
                    {optionalUnanswered.map((q) => (
                      <li key={q.id}>{q.teks_pertanyaan}</li>
                    ))}
                  </ul>
                </div>
              )}

              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Batal
                </Button>
                <Button
                  onClick={() => {
                    setOpen(false);
                    onSubmit();
                  }}
                  className="bg-secondary-1 hover:bg-secondary-1/80 text-[#232323]"
                >
                  Kirim
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
