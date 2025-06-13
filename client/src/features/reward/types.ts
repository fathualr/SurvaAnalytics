export interface Hadiah {
  id: string;
  nama: string;
  deskripsi?: string;
  stok: string;
  harga_poin: string;
  created_at: string;
  updated_at: string;
}

export interface HadiahListResponse {
  status: string;
  message: string;
  data: Hadiah[];
  meta: {
    total_items: number;
    total_pages: number;
    current_page: number;
    per_page: number;
  };
}
