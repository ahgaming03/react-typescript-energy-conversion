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
    color: "hsl(var(--CO2))",
  },
  NO2: {
    label: "NO2",
    color: "hsl(var(--NO2))",
  },
  SO2: {
    label: "SO2",
    color: "hsl(var(--SO2))",
  },
  CO: {
    label: "CO",
    color: "hsl(var(--CO))",
  },
  // others: {
  //   label: "Others",
  //   color: "hsl(var(--chart-5))",
  // },
} satisfies ChartConfig;

export function GHGPieChart() {
  // const [chartData] = useState([
  //   { gas: "CO2", value: 20, fill: "var(--color-other" },
  //   { gas: "NO2", value: 20, fill: "#ff928a" },
  //   { gas: "SO2", value: 20, fill: "#3bc3de" },
  //   { gas: "CO", value: 20, fill: "#3bc3de" },
  //   { gas: "others", value: 20, fill: "#ffae4c" },
  // ]);
  const [chartData] = useState([
    { gas: "CO2", value: 25, fill: "var(--color-CO2" },
    { gas: "NO2", value: 25, fill: "var(--color-NO2" },
    { gas: "SO2", value: 25, fill: "var(--color-SO" },
    { gas: "CO", value: 25, fill: "var(--color-CO" },
    // { gas: "others", value: 20, fill: "#ffae4c" },
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
          case "SO2":
            d.value = tempData[0]["SO2"];
            break;
          case "CO":
            d.value = tempData[0]["CO"];
            break;
          // case "others":
          //   d.value = tempData[0]["others"];
          //   break;
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
