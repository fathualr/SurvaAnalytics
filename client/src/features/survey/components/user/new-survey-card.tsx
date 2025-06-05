'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export const NewSurveyCard = () => (
  <Card className="overflow-hidden flex flex-col h-[220px] p-0 shadow bg-accent-1 rounded-xl hover:opacity-75 transition">
    <Link href="/manage-survey/add" className="flex flex-col h-full w-full">
      <div className="flex-grow flex items-center justify-center bg-primary-2">
        <Plus className="w-40 h-40 text-accent-1 opacity-75" />
      </div>
      <CardContent className="p-0">
        <div className="h-14 bg-primary-1 text-accent-1 p-3 flex items-center justify-center rounded-t-none">
          <span className="text-lg font-semibold">Survei baru</span>
        </div>
      </CardContent>
    </Link>
  </Card>
);
