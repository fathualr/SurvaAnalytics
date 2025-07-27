import { api } from '@/lib/api';
import { GeneratedSurveyPayload, GeneratedSurveyDetail } from '../types/types';

export const userSurveyGenerationService = {
  save: async (payload: GeneratedSurveyPayload): Promise<GeneratedSurveyDetail> => {
    const response = await api.post('/api/users/survei/save', payload);
    return response.data.data;
  },
};
