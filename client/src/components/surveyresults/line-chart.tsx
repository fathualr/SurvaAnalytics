"use client"
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; 

export default function LineChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [{
          label: 'Line',
          data: [12, 19, 3, 5],
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 2,
          fill: false,
          tension: 0.3,
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