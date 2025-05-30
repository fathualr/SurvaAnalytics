import { api } from '@/lib/api';
import {
  AuthResponse,
  RegisterInitPayload,
  VerifyOtpPayload,
  CompleteRegisterPayload
} from './types';

export const authService = {
  emailRegister: async (payload: RegisterInitPayload): Promise<AuthResponse> => {
    const response = await api.post('/api/register', payload);
    return response.data;
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<AuthResponse> => {
    const response = await api.post('/api/register/verify', payload);
    return response.data;
  },

  completeAccount: async (payload: CompleteRegisterPayload): Promise<AuthResponse> => {
    const response = await api.post('/api/register/account', payload);
    return response.data;
  },
};
