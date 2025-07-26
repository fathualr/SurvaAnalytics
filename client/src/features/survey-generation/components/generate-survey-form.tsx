'use client';

import { useState, useEffect } from 'react';
import { useGenerateSurveyStructure } from '@/features/.python-service/hooks/useUserPythonService';
import { Loader2Icon } from 'lucide-react';
import { ShinyGeminiButton } from '@/components/umum/shiny-gemini-button';
import { GeminiIcon } from '@/components/icons/gemini';
import { GeneratedSurveyStructure } from '@/features/.python-service/types/types';

interface GenerateSurveyFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSuccess?: (data: GeneratedSurveyStructure) => void;
  setIsError?: (value: boolean) => void;
}

export const GenerateSurveyForm = ({
  prompt,
  setPrompt,
  onSuccess,
  setIsError,
}: GenerateSurveyFormProps) => {
  const [submittedPrompt, setSubmittedPrompt] = useState('');

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGenerateSurveyStructure(submittedPrompt, !!submittedPrompt);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = prompt.trim();
    if (!trimmed) return;

    if (trimmed === submittedPrompt) {
      refetch();
    } else {
      setSubmittedPrompt(trimmed);
    }
  };

  useEffect(() => {
    if (data) {
      onSuccess?.(data);
      setIsError?.(false);
    }
  }, [data, onSuccess, setIsError]);

  useEffect(() => {
    if (isError) {
      setIsError?.(true);
    }
  }, [isError, setIsError]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-grow w-full">
      <div className="flex flex-col gap-4 items-center w-full">
        <textarea
          placeholder="What kind of survey would you like to create?"
          value={prompt}
          maxLength={1000}
          rows={5}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex flex-grow w-full sm:text-sm text-xs border border-glass-border rounded-lg p-3 resize-none bg-background/40 text-foreground placeholder:text-foreground/60 backdrop-blur-sm"
        />
        <ShinyGeminiButton
          type="submit"
          className="sm:w-fit w-full px-4 py-2"
          disabled={isLoading || isFetching || prompt.trim().length === 0}
        >
          {isLoading || isFetching ? (
            <>
              <Loader2Icon className="animate-spin w-5 h-5" />
              <span className="text-xl font-semibold">Generating...</span>
            </>
          ) : (
            <>
              <GeminiIcon className="w-5 h-5" />
              <span className="text-xl font-semibold">
                {submittedPrompt === prompt.trim() && data || isError ? 'Re-generate' : 'Generate'}
              </span>
              <GeminiIcon className="w-5 h-5" />
            </>
          )}
        </ShinyGeminiButton>
      </div>
    </form>
  );
};
