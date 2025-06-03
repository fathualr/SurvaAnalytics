import { api } from '@/lib/api';
import { SurveyListResponse } from '../types';

export const surveyService = {
  getPublishedSurveys: async (params?: Record<string, any>): Promise<SurveyListResponse> => {
    const response = await api.get('/api/public/survei', {
      params
    });
    return response.data;
  }
};
