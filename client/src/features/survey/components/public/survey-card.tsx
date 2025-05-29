'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardTitle } from '@/components/ui/card';
import SurveyDialog from './survey-dialog';

interface SurveyCardProps {
  judul: string;
  deskripsi?: string;
  poin: string;
  image: string;
}

export const SurveyCard = ({ judul, deskripsi, poin, image }: SurveyCardProps) => {

  return (
    <Card className="overflow-hidden p-0 flex flex-col gap-0">
      <div className="relative xl:h-[140px] md:h-[120px] h-[100px] w-full">
        <Image
          src={image}
          alt={judul}
          loading="lazy"
          fill
          sizes="25vw"
          className="rounded-t-xl object-cover"
        />
      </div>
      <CardContent className="bg-primary-2 text-accent-1 px-4 py-3 flex flex-col gap-1 flex-grow">
        <CardTitle className="md:text-xl sm:text-lg text-md font-bold leading-snug line-clamp-1 min-h-[1.5rem]">
          {judul}
        </CardTitle>
        <p className="md:text-md sm:text-sm text-xs font-medium">{poin} pts</p>
        <div className="flex justify-end mt-auto pt-2">
          <SurveyDialog
            judul={judul}
            deskripsi={deskripsi}
            poin={poin} 
          />
        </div>
      </CardContent>
    </Card>
  );
};
