'use client'

import { NavUmum } from "@/components/umum/nav-umum";
import { UserSurveyList } from '@/features/survey/components/user/user-survey-list';
import { useState } from "react";
import { GeminiIcon } from "../../icons/gemini";
import { ShinyGeminiButton } from "@/components/umum/shiny-gemini-button";
import Link from "next/link";

export function ManageSurveyPage() {
  const [page, setPage] = useState(1);
  const limit = 8;
  
  return (
    <main className="flex flex-col w-full overflow-hidden min-h-screen pt-16 pb-5 md:px-10 px-5">
      <NavUmum />

      <section className="flex flex-col flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold my-4">
          Manage Survey
        </h1>

        <Link href="/generate-survey" passHref>
          <ShinyGeminiButton className="p-3 md:mb-5 mb-3 w-full">
            <GeminiIcon className="w-5 h-5" />
            <span className="text-xl font-semibold">
              Build survey with AI
            </span>
            <GeminiIcon className="w-5 h-5" />
          </ShinyGeminiButton>
        </Link>

        <UserSurveyList
          page={page}
          limit={limit}
          onPageChange={setPage}
        />
      </section>
    </main>
  );
}