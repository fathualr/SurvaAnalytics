import { Metadata } from 'next';
import { ConfigurationSurveyPricePage } from '@/components/pages/admin/configuration-survey-price';

export const metadata: Metadata = {
  title: 'Konfigurasi Harga Survei',
  description: 'Mengelola harga survei aplikasi.',
};

export default function ManageAdmin() {
  return <ConfigurationSurveyPricePage />;
}
