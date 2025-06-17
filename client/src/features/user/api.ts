import api from '@/lib/api';
import {
  Pengguna,
  GetPenggunasResponse,
  GetPenggunaResponse,
  CreatePenggunaPayload,
  UpdatePenggunaPayload,
} from './types';

export const penggunaService = {
  getAll: async (params?: Record<string, any>): Promise<GetPenggunasResponse> => {
    const response = await api.get('/api/pengguna', { params });
    return response.data;
  },

  getById: async (id: string): Promise<GetPenggunaResponse> => {
    const response = await api.get(`/api/pengguna/${id}`);
    return response.data;
  },

  create: async (payload: CreatePenggunaPayload): Promise<Pengguna> => {
    const response = await api.post('/api/pengguna', payload);
    return response.data.data;
  },

  update: async (
    id: string,
    payload: UpdatePenggunaPayload,
  ): Promise<Pengguna> => {
    const response = await api.put(`/api/pengguna/${id}`, payload);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/pengguna/${id}`);
  },
};
