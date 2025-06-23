'use client';

import { FormSurveyPrice } from "@/features/priceConfiguration/components/form-survey-price";

export function ConfigurationSurveyPricePage() {
  return (
    <section className="flex flex-col flex-grow text-primary-1 gap-5 font-semibold">
      <h1 className="text-3xl font-bold">Konfigurasi Harga Survei</h1>

      <FormSurveyPrice />

    </section>
  );
}
