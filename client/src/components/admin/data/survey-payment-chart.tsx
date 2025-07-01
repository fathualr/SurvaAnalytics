'use client';

import { useAdminSurveyPayments } from '@/features/surveyPayment/hooks/useAdminSurveyPayment';
import { DynamicAreaChart } from '@/components/admin/dynamic-area-chart';
import * as React from 'react';

export function SurveyPaymentChart() {
  const { payments = [], isLoading } = useAdminSurveyPayments({ limit: 1000 });

  const chartData = React.useMemo(() => {
    const map: Record<string, number> = {};

    payments
      .filter(payment => payment.status === 'paid')
      .forEach(payment => {
        const date = new Date(payment.created_at).toISOString().split("T")[0];
        const amount = parseInt(payment.jumlah_dibayar || '0', 10);
        map[date] = (map[date] || 0) + amount;
      });

    return Object.entries(map)
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [payments]);

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center rounded-xl bg-glass-bg border border-glass-border backdrop-blur-md text-muted-foreground shadow-md">
        Loading chart...
      </div>
    );
  }

  return (
    <DynamicAreaChart
      data={chartData}
      dateKey="date"
      dataKeys={[
        {
          key: 'total',
          label: 'Survey Earnings (Rp)',
          color: 'var(--color-primary-1)',
        },
      ]}
      title="Survey Revenue"
      description="Earnings over time from paid surveys"
      referenceDate={new Date().toISOString().split('T')[0]}
    />
  );
}
