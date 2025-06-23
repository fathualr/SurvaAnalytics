"use client"

import { StatCard } from "@/components/admin/stat-card";
import { usePenggunas } from "@/features/user/hooks/useUser";
import { useAdminSurveys } from "@/features/survey/hooks/useAdminSurveys";
import { useAdminSurveyResponses } from "@/features/surveyResponse/hooks/useAdminResponseSurvey";
import { SurveyPaymentChart } from "@/components/admin/data/survey-payment-chart";

export function DashboardAdminPage() {
  const { meta: penggunaMeta, isLoading: loadingPengguna } = usePenggunas({ limit: 1 });
  const { meta: surveiMeta, isLoading: loadingSurvei } = useAdminSurveys({ limit: 1 });
  const { meta: responMeta, isLoading: loadingRespon } = useAdminSurveyResponses({ limit: 1 });

  return (
    <section className="grid gap-6 text-primary-1">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Pengguna"
          value={loadingPengguna ? "..." : penggunaMeta?.total_items || 0}
        />
        <StatCard
          title="Total Survei"
          value={loadingSurvei ? "..." : surveiMeta?.total_items || 0}
        />
        <StatCard
          title="Total Respon"
          value={loadingRespon ? "..." : responMeta?.total_items || 0}
        />
      </div>

      <div>
        <SurveyPaymentChart />
      </div>
    </section>
  );
}
