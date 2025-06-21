'use client';

import { FormAddReward } from "@/features/reward/components/admin/form-add";

export function ManageRewardAddPage() {
  return (
    <section className="flex flex-col flex-grow text-primary-1 gap-5 font-semibold">
      <h1 className="text-3xl font-bold">Data Hadiah</h1>

      <FormAddReward />

    </section>
  );
}
