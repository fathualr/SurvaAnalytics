export type SurveiStatus =
  | 'draft'
  | 'under_review'
  | 'payment_pending'
  | 'published'
  | 'closed'
  | 'archived'
  | 'rejected'

export interface Umum {
  id: string
  nama: string
  profil_klien: {
    initialized: boolean
    [key: string]: any
  }
};

export interface Survei {
  id: string
  id_umum: string | null
  judul: string
  deskripsi?: string
  status: SurveiStatus
  kriteria: Record<string, any>
  jumlah_responden: string
  tanggal_mulai: string
  tanggal_berakhir: string
  hadiah_poin: string
  umpan_balik?: string
  created_at: string
  updated_at: string
  Umum?: Umum
};

export interface SurveyListResponse {
  status: string
  message: string
  data: Survei[]
  meta: {
    total_items: number
    total_pages: number
    current_page: number
    per_page: number
  }
};
