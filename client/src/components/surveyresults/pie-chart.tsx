"use client"
import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function PieChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [{
          data: [12, 19, 3, 5],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-[300px] h-[300px]">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}