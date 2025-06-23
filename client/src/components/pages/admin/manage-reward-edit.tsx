'use client';

import { FormEditReward } from "@/features/reward/components/admin/form-edit";

interface ManageRewardEditPageProps {
  rewardId: string;
}

export function ManageRewardEditPage({ rewardId }: ManageRewardEditPageProps) {
  return (
    <section className="flex flex-col flex-grow text-primary-1 font-semibold">
      <h1 className="text-3xl font-bold">Data Hadiah</h1>
      <span className="block text-sm text-muted-foreground mb-5">Id: {rewardId}</span>

      <FormEditReward rewardId={rewardId} />
    </section>
  );
}
