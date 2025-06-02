import { api } from '@/lib/api';
import {
  RegisterResponse,
  LoginResponse,
  UserProfileResponse,
  RefreshTokenResponse,
  RegisterInitPayload,
  VerifyOtpPayload,
  CompleteRegisterPayload,
  LoginPayload
} from './types';

export const authService = {
  emailRegister: async (payload: RegisterInitPayload): Promise<RegisterResponse> => {
    const response = await api.post('/api/register', payload);
    return response.data;
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<RegisterResponse> => {
    const response = await api.post('/api/register/verify', payload);
    return response.data;
  },

  completeAccount: async (payload: CompleteRegisterPayload): Promise<RegisterResponse> => {
    const response = await api.post('/api/register/account', payload);
    return response.data;
  },

  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post('/api/login', payload);
    return response.data;
  },

  getProfile: async (): Promise<UserProfileResponse> => {
    const response = await api.get('/api/users/profile');
    return response.data;
  },

  refreshToken: async (): Promise<RefreshTokenResponse> => {
    const response = await api.post('/api/refresh');
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/api/logout');
  },
};
