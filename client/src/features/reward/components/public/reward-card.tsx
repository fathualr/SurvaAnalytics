'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Hadiah } from '../../types';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import RewardExchangePreview from '@/features/rewardExchange/components/user/confirmation-exchange-button';

interface RewardCardProps {
  reward: Hadiah;
}

export function RewardCard({ reward }: RewardCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="overflow-hidden md:h-[250px] sm:h-[225px] h-[200px] border border-gray-200 hover:shadow-md transition p-0 gap-0">
      <div className="relative flex-grow w-full">
        <Image
          src="/images/exchange-page/image.png"
          alt="reward"
          fill
          priority
          sizes="25vw"
          className="rounded-t-xl bg-top object-cover"
        />
      </div>
      <CardContent className="bg-primary-2 text-accent-1 p-4 flex flex-col justify-between">
        <div className="space-y-2">
          <CardTitle className="md:text-xl sm:text-lg text-md font-bold leading-snug truncate line-clamp-1">
            {reward.nama}
          </CardTitle>
          <p className="font-medium md:text-md sm:text-sm text-xs">
            Harga: <span className="font-semibold">{parseInt(reward.harga_poin, 10).toLocaleString()} Poin</span>
          </p>
        </div>
        <CardFooter className="pt-2 px-0 justify-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-secondary-1 w-full md:text-md text-sm font-semibold hover:bg-secondary-2 text-primary-1 rounded-sm"
              >
                Tukar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold">{reward.nama}</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                {reward.deskripsi?.trim() || 'Tidak ada deskripsi.'}
              </DialogDescription>
              <div className="flex flex-col space-y-1 text-sm">
                <p>
                  <strong>Harga:</strong> {parseInt(reward.harga_poin, 10).toLocaleString()} Poin
                </p>
                <p>
                  <strong>Stok:</strong> {reward.stok}
                </p>
              </div>
              <RewardExchangePreview
                idHadiah={reward.id}
                hargaPoin={Number(reward.harga_poin)}
                onSuccessClose={() => setOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
