"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 40 },
  { month: "February", desktop: 70 },
  { month: "March", desktop: 40 },
  { month: "April", desktop: 50 },
  { month: "May", desktop: 140 },
  { month: "June", desktop: 40 },
  { month: "July", desktop: 80 },
  { month: "August", desktop: 50 },
  { month: "September", desktop: 150 },
  { month: "October", desktop: 50},
  { month: "November", desktop: 90 },
  { month: "Desmber", desktop: 60 },
]

const chartConfig = {
  desktop: {
    label: "",
    color: "#3984EF", // tetap gunakan color system
  },
} satisfies ChartConfig

export function Component() {
  return (
    <Card className="w-full border-2 border-[#3984EF] bg-[#F2F9FF]"> 
    <CardHeader>
        <CardTitle className="text-base">Summary Pendapatan</CardTitle>
        <CardDescription className="text-sm">
        Total: 2.000.000 Rp
        </CardDescription>
    </CardHeader>
    <CardContent>
        {/* Bungkus chart agar ukurannya kecil */}
        <div className="max-w-lg w-full mx-auto">
        <ChartContainer config={chartConfig}>
            <AreaChart
            data={chartData}
            height={150} 
            width={300} 
            margin={{ top: 0, left: 12, right: 12, bottom: 30 }}
            >
            <CartesianGrid vertical={false} />
            <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
              <Area
                dataKey="desktop"
                type="linear"
                fill="#3984EF"
                fillOpacity={0.4}
                stroke="#FFBF68"
                strokeWidth={2.5}
              />
            </AreaChart>
        </ChartContainer>
        </div>
    </CardContent>
    </Card>

  )
}
