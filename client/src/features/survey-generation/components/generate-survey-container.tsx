'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { GeneratedSurveyStructure } from '@/features/.python-service/types/types';
import { useGenerateSurveyStructure } from '@/features/.python-service/hooks/useUserPythonService';
import { GenerateSurveyResult } from './generate-survey-result';
import { PromptSuggestionGrid } from './prompt-suggestion-grid';
import { GenerateSurveyForm } from './generate-survey-form';
import { ActionButtonSurveyGenerated } from './action-button-survey-generated';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

export const GenerateSurveyContainer = () => {
  const [prompt, setPrompt] = useState('');
  const [submittedPrompt, setSubmittedPrompt] = useState('');
  const [result, setResult] = useState<GeneratedSurveyStructure | null>(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const {
    data,
    isLoading,
    isFetching,
    isError: isFetchError,
    refetch,
    error,
  } = useGenerateSurveyStructure(submittedPrompt, !!submittedPrompt);

  const handleSubmit = () => {
    if (!isLoggedIn) {
      router.push('/login');
      toast.error('Please log in first to generate survey.');
      return;
    }

    const trimmed = prompt.trim();
    if (!trimmed) return;

    if (trimmed === submittedPrompt) {
      refetch();
    } else {
      setSubmittedPrompt(trimmed);
    }
  };

  const handleClear = () => {
    setPrompt('');
    setSubmittedPrompt('');
    setResult(null);
    setIsError(false);
  };

if (data && data !== result) {
  setResult(data);
  setIsError(false);
  setErrorMessage('');

  if ('error' in data && data.error) {
    setIsError(true);
    setErrorMessage(typeof data.error === 'string' ? data.error : 'An unexpected error occurred.');
  }
}

if (isFetchError && !isError) {
  setIsError(true);
  const message =
    typeof error === 'object' && error !== null && 'message' in error
      ? String(error.message)
      : 'Failed to generate survey.';
  setErrorMessage(message);
}

  return (
    <div
      className="flex flex-grow flex-col w-full text-center gap-5 sm:p-10 p-5 rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl shadow-md text-muted-foreground"
      style={{
        background: 'var(--glass-background)',
        borderColor: 'var(--glass-border)',
        boxShadow: 'var(--glass-shadow)',
        backdropFilter: 'var(--glass-blur)',
      }}
    >
      <GenerateSurveyForm
        prompt={prompt}
        setPrompt={setPrompt}
        isLoading={isLoading || isFetching}
        onSubmit={handleSubmit}
        isRegenerate={submittedPrompt === prompt.trim() && !!result}
        isDisabled={!isLoggedIn}
      />

      <div className="w-full space-y-3 mt-auto">
        <Separator className="bg-foreground/25 my-3"/>
        {result || isError ? (
          <>
            <ActionButtonSurveyGenerated
              onClear={handleClear}
              isError={isError}
              data={!isError && result && 'error' in result === false ? result : null}
            />
            <GenerateSurveyResult data={result ?? { error: errorMessage }} isError={isError} />
          </>
        ) : (
          <PromptSuggestionGrid
            onSelect={(selectedPrompt) => {
              if (isLoggedIn) setPrompt(selectedPrompt);
            }}
            isDisabled={!isLoggedIn} 
          />
        )}
      </div>
    </div>
  );
};
