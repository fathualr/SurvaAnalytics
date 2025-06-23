'use client';

import { FormAddRewardExchange } from "@/features/rewardExchange/components/admin/form-add";

export function ManageRewardExchangeAddPage() {
  return (
    <section className="flex flex-col flex-grow text-primary-1 gap-5 font-semibold">
      <h1 className="text-3xl font-bold">Data Penukaran Hadiah</h1>

      <FormAddRewardExchange />

    </section>
  );
}
