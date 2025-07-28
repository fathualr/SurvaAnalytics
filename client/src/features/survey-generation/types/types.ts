export interface PertanyaanSurvei {
  teks_pertanyaan: string;
  tipe_pertanyaan: string;
  opsi: string[];
}

export interface GeneratedSurveyPayload {
  judul: string;
  deskripsi: string;
  jumlah_responden: number;
  kriteria: Record<string, any>;
  PertanyaanSurvei?: PertanyaanSurvei[];
}

export interface GeneratedSurveyDetail {
  id: string;
  id_umum: string;
  judul: string;
  deskripsi: string;
  status: 'draft' | 'published' | string;
  kriteria: Record<string, unknown>;
  jumlah_responden: string;
  tanggal_mulai: string;
  tanggal_berakhir: string;
  hadiah_poin: string;
  umpan_balik: string | null;
  created_at: string;
  updated_at: string;
  Umum?: Record<string, any>;
}
