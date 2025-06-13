'use client';

import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { ResponSummary } from '../../types';
import { generateSoftColorPalette } from '../../utils/generateSoftColorPalette';

ChartJS.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  summary: ResponSummary;
}

export default function RadarChart({ summary }: RadarChartProps) {
  const summaryData = summary.summary as Record<string, number>;
  const labels = Object.keys(summaryData);
  const values = Object.values(summaryData);
  const backgroundColor = generateSoftColorPalette(labels.length);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: 'rgba(15, 15, 15, 0.1)',
        borderColor: 'rgba(15, 15, 15, 0.5)',
        borderWidth: 1,
        pointBackgroundColor: backgroundColor,
        pointBorderColor: backgroundColor,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        min: 0,
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return <Radar data={data} options={options} />;
}
