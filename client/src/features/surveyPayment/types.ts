export type SurveyPaymentStatus = 
  'pending' | 
  'paid' | 
  'failed' | 
  'expired'

export interface SurveyPayment {
  id: string
  id_survei: string
  id_umum: string
  jumlah_tagihan: string
  metode_pembayaran: string | null
  status: SurveyPaymentStatus
  invoice_url: string | null
  jumlah_dibayar: string
  created_at: string
  updated_at: string
}

export interface SurveyPaymentListResponse {
  status: string
  message: string
  data: SurveyPayment[]
  meta: {
    total_items: number
    total_pages: number
    current_page: number
    per_page: number
  }
}
