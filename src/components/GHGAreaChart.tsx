import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IGHG } from "@/utils/type";
import { useEffect, useState } from "react";

// temp data
import { useDataContext } from "@/context/DataContext";

const chartConfig = {
  CO2: {
    label: "CO2",
    color: "#8979ff",
  },
  NO2: {
    label: "NO2",
    color: "#ff928a",
  },
  CH4: {
    label: "CH4",
    color: "#3bc3de",
  },
  others: {
    label: "Others",
    color: "#ffae4c",
  },
} satisfies ChartConfig;

export function GHGAreaChart() {
  const [chartData, setChartData] = useState<IGHG[]>([]);
  const data = useDataContext().GHG;
  useEffect(() => {
    let tempData = data;
    if (!tempData) return;
    if (tempData.length > 7) {
      tempData = tempData.slice(tempData.length - 7);
    }
    // console.log(useDataContext());
    setChartData(tempData);
  }, []);

  return (
    <Card>
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold uppercase">Greenhouse Gas</div>
          <select className="rounded-lg bg-[#38b649] px-2 py-1 text-white">
            <option className="bg-white text-black" value="day">
              Day
            </option>
            <option className="bg-white text-black" value="month">
              Month
            </option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto w-full max-md:h-56 md:h-64"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 16,
              top: 12,
            }}
            stackOffset="expand"
          >
            <CartesianGrid />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              angle={-50}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <defs>
              <linearGradient id="fillCO2" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-CO2)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-CO2)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillNO2" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-NO2)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-NO2)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillCH4" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-CH4)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-CH4)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillOthers" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-others)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-others)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="CO2"
              type="natural"
              fill="url(#fillCO2)"
              fillOpacity={0.4}
              stroke="var(--color-CO2)"
              stackId="GHG"
              dot={true}
            />
            <Area
              dataKey="NO2"
              type="natural"
              fill="url(#fillNO2)"
              fillOpacity={0.4}
              stroke="var(--color-NO2)"
              stackId="GHG"
              dot={true}
            />
            <Area
              dataKey="CH4"
              type="natural"
              fill="url(#fillCH4)"
              fillOpacity={0.4}
              stroke="var(--color-CH4)"
              stackId="GHG"
              dot={true}
            />
            <Area
              dataKey="others"
              type="natural"
              fill="url(#fillOthers)"
              fillOpacity={0.1}
              stroke="var(--color-others)"
              stackId="GHG"
              dot={true}
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
