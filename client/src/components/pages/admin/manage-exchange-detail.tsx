'use client';

import { FormDetailRewardExchange } from "@/features/rewardExchange/components/admin/form-detail";

interface ManageRewardExchangeDetailPageProps {
  rewardExchangeId: string;
}

export function ManageRewardExchangeDetailPage({ rewardExchangeId }: ManageRewardExchangeDetailPageProps) {
  return (
    <section className="flex flex-col flex-grow text-primary-1 font-semibold">
      <h1 className="text-3xl font-bold">Data Penukaran Hadiah</h1>
      <span className="block text-sm text-muted-foreground mb-5">Id: {rewardExchangeId}</span>

      <FormDetailRewardExchange rewardExchangeId={rewardExchangeId} />
    </section>
  );
}
