'use client';

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Survei, SurveiStatus } from '../../types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface UserSurveyCardProps {
  surveys: Survei;
}

const statusVariantMap: Record<SurveiStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  draft: 'secondary',
  under_review: 'default',
  payment_pending: 'secondary',
  published: 'default',
  closed: 'destructive',
  archived: 'outline',
  rejected: 'destructive',
};

const redirectByStatus = (status: SurveiStatus, id: string) => {
  const viewOnlyStatuses: SurveiStatus[] = ['published', 'closed', 'archived'];
  return viewOnlyStatuses.includes(status)
    ? `/manage-survey/overview/${id}`
    : `/manage-survey/edit/${id}`;
};

export const UserSurveyCard = ({ surveys }: UserSurveyCardProps) => {
  const redirectUrl = redirectByStatus(surveys.status, surveys.id);

  return (
    <Card className="overflow-hidden flex flex-col p-0 gap-0 h-[220px] text-[#232323]">
      <CardContent className="bg-primary-3 px-4 py-3 flex flex-col gap-1 flex-grow">
        <CardTitle className="text-xl font-bold leading-snug line-clamp-2 min-h-[2.8rem]">
          {surveys.judul}
        </CardTitle>
        <CardDescription className="text-[#232323]">
          <p className="line-clamp-2">
            {surveys.deskripsi || '-'}
          </p>
        </CardDescription>
        <div className="flex justify-between items-center mt-auto pt-2">
          <Badge variant={statusVariantMap[surveys.status]}>
            {surveys.status.replace('_', ' ')}
          </Badge>
          <span className="text-xs font-semibold text-primary">
            {surveys.hadiah_poin} poin
          </span>
        </div>
      </CardContent>
      <Link href={redirectUrl} passHref>
        <Button className="cursor-pointer flex items-center justify-center bg-primary-1 text-accent-1 hover:bg-primary-2 h-14 rounded-t-none w-full">
          <span className="text-lg font-semibold">Detail survei</span>
        </Button>
      </Link>
    </Card>
  );
};
