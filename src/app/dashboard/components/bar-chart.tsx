"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart";

interface ApplicationData {
  status: string;
  _count: {
    _all: number;
  };
}

const chartConfig = {
  "_count._all": {
    label: "Total",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ApplicationsBarChart({
  chartData,
}: Readonly<{
  chartData: ApplicationData[];
}>) {
  const statusColors: Record<string, string> = {
    APPLIED: "#3b82f6",
    INTERVIEWING: "#f59e0b",
    OFFERED: "#22c55e",
    REJECTED: "#ef4444",
  };

  const updatedChartData = chartData.map((entry) => ({
    ...entry,
    fill: statusColors[entry.status] ?? "#3b82f6",
  }));

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Applications by Status</CardTitle>
        <CardDescription>Total applications by status</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart accessibilityLayer data={updatedChartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="status"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="_count._all" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
