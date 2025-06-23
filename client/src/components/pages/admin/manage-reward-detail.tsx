'use client';

import { FormDetailReward } from "@/features/reward/components/admin/form-detail";

interface ManageRewardDetailPageProps {
  rewardId: string;
}

export function ManageRewardDetailPage({ rewardId }: ManageRewardDetailPageProps) {
  return (
    <section className="flex flex-col flex-grow text-primary-1 font-semibold">
      <h1 className="text-3xl font-bold">Data Hadiah</h1>
      <span className="block text-sm text-muted-foreground mb-5">Id: {rewardId}</span>

      <FormDetailReward rewardId={rewardId} />
    </section>
  );
}
