import { api } from '@/lib/api';
import { SurveyListResponse } from '../types';

export const surveyService = {
  getPublishedSurveys: async (page = 1, limit = 10): Promise<SurveyListResponse> => {
    const response = await api.get('/api/public/survei', {
      params: {
        page,
        limit,
      }
    });
    return response.data;
  },
};
