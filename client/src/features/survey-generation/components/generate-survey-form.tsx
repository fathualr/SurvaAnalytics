'use client';

import { Loader2Icon } from 'lucide-react';
import { ShinyGeminiButton } from '@/components/umum/shiny-gemini-button';
import { GeminiIcon } from '@/components/icons/gemini';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface GenerateSurveyFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
  isRegenerate?: boolean;
  isDisabled?: boolean;
}

export const GenerateSurveyForm = ({
  prompt,
  setPrompt,
  isLoading,
  onSubmit,
  isRegenerate = false,
  isDisabled = false,
}: GenerateSurveyFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const { isLoggedIn } = useAuth();

  return (
    <form onSubmit={handleSubmit} className="flex flex-grow w-full">
      <div className="flex flex-col gap-4 items-center w-full">
        <textarea
          placeholder="What kind of survey would you like to create?"
          value={prompt}
          maxLength={1000}
          rows={5}
          disabled={isDisabled}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex flex-grow w-full sm:text-sm text-xs border border-glass-border rounded-lg p-3 resize-none bg-background/40 text-foreground placeholder:text-foreground/60 backdrop-blur-sm"
        />
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ShinyGeminiButton
                type="submit"
                className="sm:w-fit w-full px-4 py-2"
                disabled={isLoggedIn ? isLoading || prompt.trim().length === 0 : false}
              >
                {isLoading ? (
                  <>
                    <Loader2Icon className="animate-spin w-5 h-5" />
                    <span className="text-xl font-semibold">Generating...</span>
                  </>
                ) : (
                  <>
                    <GeminiIcon className="w-5 h-5" />
                    <span className="text-xl font-semibold">
                      {isRegenerate ? 'Re-generate' : 'Generate'}
                    </span>
                    <GeminiIcon className="w-5 h-5" />
                  </>
                )}
              </ShinyGeminiButton>
            </TooltipTrigger>
            {!isLoggedIn && (
              <TooltipContent>
                <p className="font-regular">You have to be logged in to use this feature.</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </form>
  );
};
