'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserSurvey } from '@/features/survey/hooks/useUserSurveys';
import { useAuth } from "@/features/auth/hooks/useAuth";

interface NavSurveyProps {
  surveyId: string;
}

export function NavSurvey({ surveyId }: NavSurveyProps) {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const shouldFetch = isLoggedIn && !authLoading;
  const pathname = usePathname();
  const { data: survey, isLoading, isError } = useUserSurvey(surveyId, shouldFetch);

  const allowedStatuses = ['published', 'closed', 'archived'];

  if (isLoading) return null;
  if (isError || !survey || !allowedStatuses.includes(survey.status)) return null;

  const tabs = [
    {
      label: "Edit",
      href: `/manage-survey/edit/${surveyId}`,
    },
    {
      label: "Overview",
      href: `/manage-survey/overview/${surveyId}`,
    },
    {
      label: "Respons",
      href: `/manage-survey/responses/${surveyId}`,
    },
    {
      label: "Analisis",
      href: `/manage-survey/analysis/${surveyId}`,
    },
  ];

  const currentTab = tabs.find(tab => pathname.startsWith(tab.href))?.href;

  return (
    <Tabs value={currentTab}>
      <TabsList className="grid w-full grid-cols-4 mt-3">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.href} value={tab.href} asChild>
            <Link href={tab.href}>
              {tab.label}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
