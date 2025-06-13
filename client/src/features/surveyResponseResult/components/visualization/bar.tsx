'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ResponSummary } from '../../types';
import { generateSoftColorPalette } from '../../utils/generateSoftColorPalette';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface BarChartProps {
  summary: ResponSummary;
}

export default function BarChart({ summary }: BarChartProps) {
  const summaryData = summary.summary as Record<string, number>;
  const labels = Object.keys(summaryData);
  const values = Object.values(summaryData);
  const backgroundColor = generateSoftColorPalette(labels.length);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        clip: false,
        anchor: 'end' as const,
        align: 'end' as const,
        formatter: (value: number) => value,
        font: {
          weight: 'bold' as const,
        },
        offset: -7,
        color: '#000',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return <Bar data={data} options={options} plugins={[ChartDataLabels]} />;
}
