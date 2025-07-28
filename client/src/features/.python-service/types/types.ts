export interface MultipleTextInput {
  texts: string[];
}

export interface SentimentResult {
  label: 'positive' | 'neutral' | 'negative';
  confidence: number;
}

export interface SentimentSummary {
  positive: number;
  neutral: number;
  negative: number;
}

export interface SentimentSummaryResponse {
  summary: SentimentSummary;
}

export interface UserPrompt {
  prompt: string;
}

export interface PertanyaanSurvei {
  teks_pertanyaan: string;
  tipe_pertanyaan: string;
  opsi: string[];
}

export interface SurveyStructure {
  id?: string;
  judul: string;
  deskripsi: string;
  jumlah_responden: number;
  kriteria: Record<string, any>;
  PertanyaanSurvei: PertanyaanSurvei[];
}

export type GeneratedSurveyStructure =
  | SurveyStructure
  | { error: string };
