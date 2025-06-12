import { useQuery } from '@tanstack/react-query';
import { responSurveiService } from '../api';
import {
  ResponSurvei,
  ResponSurveiListResponse,
  ResponSummary,
} from '../types';

export interface UseResponSurveiOptions {
  page?: number;
  limit?: number;
  filters?: Record<string, any>;
  enabled?: boolean;
}

export const useResponSurveis = (
  surveiId: string,
  options: UseResponSurveiOptions = {}
) => {
  const {
    page = 1,
    limit = 10,
    filters = {},
    enabled = true,
  } = options;

  const queryKey = ['respon-surveis', surveiId, { page, limit, ...filters }];

  const {
    data,
    error,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery<ResponSurveiListResponse>({
    queryKey,
    queryFn: () =>
      responSurveiService.getAll(surveiId, { page, limit, ...filters }),
    enabled: !!surveiId && enabled,
    staleTime: 1000 * 60,
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
    retry: 2,
  });

  return {
    responSurveis: data?.data || [],
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

export const useResponSurvei = (
  surveiId: string,
  responId: string,
  enabled = true
) => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery<ResponSurvei>({
    queryKey: ['respon-survei', surveiId, responId],
    queryFn: () => responSurveiService.getById(surveiId, responId),
    enabled: !!surveiId && !!responId && enabled,
  });

  return {
    responSurvei: data,
    isLoading,
    isFetching,
    isError,
    error,
    errorMessage: error?.message || '',
    refetch,
  };
};

export const useResponSurveiSummary = (surveiId: string, enabled = true) => {
  return useQuery<ResponSummary[]>({
    queryKey: ['respon-survei-summary', surveiId],
    queryFn: () => responSurveiService.getSummary(surveiId),
    enabled: !!surveiId && enabled,
  });
};
