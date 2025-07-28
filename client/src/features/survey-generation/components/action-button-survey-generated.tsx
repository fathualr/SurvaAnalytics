'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Eraser, Save } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';
import { useUserSaveGeneratedSurvey } from '../hooks/useUserSurveyGeneration';
import { GeneratedSurveyPayload } from '../types/types';
import { toast } from 'sonner';

interface ActionButtonSurveyGeneratedProps {
  onClear: () => void;
  isError?: boolean;
  data?: GeneratedSurveyPayload | null;
}

export const ActionButtonSurveyGenerated = ({
  onClear,
  isError,
  data,
}: ActionButtonSurveyGeneratedProps) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const { mutateAsync, isPending } = useUserSaveGeneratedSurvey();

  const handleSave = async () => {
    if (!isLoggedIn) {
      router.push('/login');
      toast.error('Please log in first to save generated survey.');
      return;
    }

    if (!data) {
      toast.error('No survey data to save.');
      return;
    }

    try {
      const result = await mutateAsync(data);
      onClear();
      router.push(`/manage-survey/edit/${result.id}`);
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to save survey.';
      toast.error(message);
    }
  };

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

      {!isError && (
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                onClick={handleSave}
                disabled={!data || isPending}
                className="flex items-center gap-2 px-4 py-2 transition-none rounded-none text-green-600 bg-green-500/20 hover:bg-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex-1 basis-40 min-w-0"
              >
                <Save className="w-4 h-4 shrink-0" />
                <span className="truncate">
                  {isPending ? 'Saving...' : 'Save Result'}
                </span>
              </Button>
            </TooltipTrigger>
            {!isLoggedIn && (
              <TooltipContent>
                <p className="font-regular">You have to be logged in to save this survey</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};
