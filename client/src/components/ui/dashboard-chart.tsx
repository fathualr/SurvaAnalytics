"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A linear area chart with daily data"

const chartData = [
  { month: "Jan", desktop: 40 },
  { month: "Feb", desktop: 70 },
  { month: "Mar", desktop: 40 },
  { month: "Apr", desktop: 50 },
  { month: "May", desktop: 140 },
  { month: "June", desktop: 40 },
  { month: "July", desktop: 80 },
  { month: "Aug", desktop: 50 },
  { month: "Sepr", desktop: 150 },
  { month: "Oct", desktop: 50},
  { month: "Nov", desktop: 90 },
  { month: "Des", desktop: 60 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartAreaLinearDaily() {
  return (
    <Card className="border-3 border-[#3E82CD] rounded-lg bg-[#F2F9FF] ">
      <CardHeader>
        <CardTitle className="text-lg">Jumlah Pendapatan</CardTitle>
        <CardDescription>
         Rp.3.400.000
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-40 w-full" config={chartConfig}>
          <AreaChart
            data={chartData}
            margin={{ left: 12, right: 12 }}

          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
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
      </CardContent>
    </Card>
  )
}
