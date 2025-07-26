'use client';

import { useState, useCallback } from 'react';
import { GenerateSurveyForm } from './generate-survey-form';
import { GeneratedSurveyStructure } from '@/features/.python-service/types/types';
import { GenerateSurveyResult } from '@/features/survey-generation/components/generate-survey-result';
import { PromptSuggestionGrid } from '@/features/survey-generation/components/prompt-suggestion-grid';
import { ActionButtonSurveyGenerated } from './action-button-survey-generated';

export const GenerateSurveyContainer = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<GeneratedSurveyStructure | null>(null);
  const [isError, setIsError] = useState(false);

  const handleSuccess = useCallback((data: GeneratedSurveyStructure) => {
    setResult(data);
    setIsError(false);
  }, []);

  const handleClear = () => {
    setPrompt('');
    setResult(null);
    setIsError(false);
  };

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
        onSuccess={handleSuccess}
        setIsError={setIsError}
      />

      <div className="w-full space-y-3 mt-auto">
        {result || isError ? (
          <>
            <ActionButtonSurveyGenerated
              onClear={handleClear}
            />
            <GenerateSurveyResult data={result ?? { error: '' }} isError={isError} />
          </>
        ) : (
          <PromptSuggestionGrid onSelect={(selectedPrompt) => setPrompt(selectedPrompt)} />
        )}
      </div>
    </div>
  );
};
