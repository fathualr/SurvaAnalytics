'use client';

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
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
      },
      datalabels: {
        color: '#000',
        formatter: (value: number) => value,
        font: {
          weight: 'bold' as const,
        },
      },
    },
  };

  return <Doughnut className="w-full" data={data} options={options} plugins={[ChartDataLabels]} />;
}
