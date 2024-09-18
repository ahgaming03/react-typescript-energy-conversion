import { LabelList, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useDataContext } from "@/context/DataContext";
import { useEffect, useState } from "react";

export const description = "A pie chart with a custom label";

const chartConfig = {
  value: {
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
  const [chartData] = useState([
    { gas: "CO2", value: 25, fill: "#8979ff" },
    { gas: "NO2", value: 25, fill: "#ff928a" },
    { gas: "CH4", value: 25, fill: "#3bc3de" },
    { gas: "others", value: 25, fill: "#ffae4c" },
  ]);
  const data = useDataContext().GHG;
  useEffect(() => {
    let tempData = data.slice(data.length - 1);
    if (tempData.length > 0)
      chartData.map((d) => {
        switch (d.gas) {
          case "CO2":
            d.value = tempData[0]["CO2"];
            break;
          case "NO2":
            d.value = tempData[0]["NO2"];
            break;
          case "CH4":
            d.value = tempData[0]["CH4"];
            break;
          case "others":
            d.value = tempData[0]["others"];
            break;
        }
      });
  }, []);

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
            dataKey="value"
            nameKey="gas"
            startAngle={90}
            endAngle={-270}
          >
            <LabelList
              dataKey="gas"
              className="fill-background"
              stroke="3"
              fontSize={12}
              formatter={(value: keyof typeof chartConfig) =>
                chartData.find((d) => d.gas === value)?.value + "%"
              }
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </>
  );
}
