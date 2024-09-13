
import { LabelList, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A pie chart with a custom label";

const chartData = [
  { gasName: "CO2", gasPercentage: 39.87, fill: "#8979ff" },
  { gasName: "NO2", gasPercentage: 19.93, fill: "#ff928a" },
  { gasName: "CH4", gasPercentage: 24.92, fill: "#3bc3de" },
  { gasName: "others", gasPercentage: 15.28, fill: "#ffae4c" },
];

const chartConfig = {
  gasPercentage: {
    label: "Gas",
  },
  CO2: {
    label: "CO2",
    color: "hsl(var(--chart-1))",
  },
  NO2: {
    label: "NO2",
    color: "hsl(var(--chart-2))",
  },
  CH4: {
    label: "CH4",
    color: "hsl(var(--chart-3))",
  },
  others: {
    label: "Others",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function GHGPieChart() {
  return (
    <>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="gasPercentage"
            nameKey="gasName"
            startAngle={90}
            endAngle={-270}
          >
            <LabelList
              dataKey="gasName"
              className="fill-backwground"
              stroke="none"
              fontSize={10}
              formatter={(value: keyof typeof chartConfig) =>
                chartConfig[value]?.label
              }
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </>
  );
}
