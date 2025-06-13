'use client';

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ResponSummary } from '../../types';
import { generateSoftColorPalette } from '../../utils/generateSoftColorPalette';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface DoughnutChartProps {
  summary: ResponSummary;
}

export default function DoughnutChart({ summary }: DoughnutChartProps) {
  const summaryData = summary.summary as Record<string, number>;
  const labels = Object.keys(summaryData);
  const values = Object.values(summaryData);
  const total = values.reduce((acc, val) => acc + val, 0);
  const backgroundColor = generateSoftColorPalette(labels.length);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        align: 'start' as const,
        labels: {
          boxWidth: 12,
          boxHeight: 12,
        },
      },
      datalabels: {
        color: '#000',
        formatter: (_: number, context: any) => {
          const val = context.dataset.data[context.dataIndex];
          const percentage = ((val / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
        font: {
          weight: 'bold' as const,
        },
      },
      tooltip: {
        callbacks: {
          title: (context: any[]) => context[0].label ?? '',
          label: (context: any) => {
            const val = context.raw ?? 0;
            const percentage = ((val / total) * 100).toFixed(1);
            return `${val} (${percentage}%)`;
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={options} plugins={[ChartDataLabels]} />

}
