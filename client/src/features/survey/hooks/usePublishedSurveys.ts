import useSWR from 'swr';
import { surveyService } from '../api/public';
import { SurveyListResponse } from '../types';

interface UsePublishedSurveysOptions {
  page?: number;
  limit?: number;
}

export const usePublishedSurveys = ({ page = 1, limit = 10 }: UsePublishedSurveysOptions = {}) => {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR<SurveyListResponse>(
    ['/api/public/survei', page, limit],
    () => surveyService.getPublishedSurveys(page, limit),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: true,
      errorRetryCount: 2,
      errorRetryInterval: 3000,
    }
  );

  return {
    surveys: data?.data || [],
    meta: data?.meta,
    isLoading,
    isError: !!error,
    mutate,
    errorMessage: error?.message || data?.message,
    status: data?.status,
  };
};