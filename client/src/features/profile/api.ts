import { api } from '@/lib/api';
import { UserProfileResponse, UserProfile } from './types';

export const profileService = {
  getProfile: async (): Promise<UserProfileResponse> => {
    const response = await api.get('/api/users/profile');
    return response.data;
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfileResponse> => {
    const response = await api.patch('/api/users/profile', data);
    return response.data;
  },
};