import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userSurveyGenerationService } from '../api/user';
import { toast } from 'sonner';

export const useUserSaveGeneratedSurvey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userSurveyGenerationService.save,
    onSuccess: () => {
      toast.success('Generated survey saved successfully.');
      queryClient.invalidateQueries({ queryKey: ['user-survey'] });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to save survey.';
      toast.error(message);
    },
  });
};
