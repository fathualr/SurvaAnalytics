"use client"
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; 

export default function BarChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [{
          label: 'Bar',
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
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-[500px] h-[500px] ">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}