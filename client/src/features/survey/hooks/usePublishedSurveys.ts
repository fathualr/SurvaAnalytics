import { useQuery } from '@tanstack/react-query';
import { surveyService } from '@/features/survey/api/public';
import { SurveyListResponse } from '@/features/survey/types';

export interface UsePublishedSurveysOptions {
  page?: number;
  limit?: number;
  filters?: Record<string, any>;
}

export const usePublishedSurveys = (options: UsePublishedSurveysOptions = {}) => {
  const {
    page = 1,
    limit = 10,
    filters = {},
  } = options;

  const queryKey = ['published-surveys', { page, limit, ...filters }];

  const {
    data,
    error,
    isLoading,
    isFetching,
    refetch,
    isError,
  } = useQuery<SurveyListResponse>({
    queryKey,
    queryFn: () =>
      surveyService.getPublishedSurveys({ page, limit, ...filters }),
    staleTime: 1000 * 60,
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
    retry: 2,
  });

  return {
    surveys: data?.data || [],
    meta: data?.meta,
    isLoading,
    isFetching,
    isError,
    error,
    errorMessage: error?.message || data?.message,
    status: data?.status,
    refetch,
  };
};
