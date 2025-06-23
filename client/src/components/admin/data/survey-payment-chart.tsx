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
        const jumlah = parseInt(payment.jumlah_dibayar || '0', 10);
        map[date] = (map[date] || 0) + jumlah;
      });

    return Object.entries(map)
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [payments]);

  if (isLoading) return <p>Loading chart...</p>;

  return (
    <DynamicAreaChart
      data={chartData}
      dateKey="date"
      dataKeys={[
        { key: "total", label: "Pendapatan", color: "var(--color-primary-1)" },
      ]}
      title="Pendapatan dari Survei"
      description="Grafik pendapatan berdasarkan tanggal"
      referenceDate={new Date().toISOString().split("T")[0]}
    />
  );
}
