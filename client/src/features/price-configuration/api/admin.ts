import { api } from '@/lib/api';
import {
  KonfigurasiHargaResponse,
  CreateKonfigurasiHargaPayload,
  UpdateKonfigurasiHargaPayload,
} from '../types/types';

export const getKonfigurasiHarga = async (): Promise<KonfigurasiHargaResponse> => {
  const res = await api.get('/api/konfigurasi-harga');
  return res.data;
};

export const createKonfigurasiHarga = async (
  payload: CreateKonfigurasiHargaPayload
): Promise<KonfigurasiHargaResponse> => {
  const res = await api.post('/api/konfigurasi-harga', payload);
  return res.data;
};

export const updateKonfigurasiHarga = async (
  payload: UpdateKonfigurasiHargaPayload
): Promise<KonfigurasiHargaResponse> => {
  const res = await api.patch('/api/konfigurasi-harga', payload);
  return res.data;
};
