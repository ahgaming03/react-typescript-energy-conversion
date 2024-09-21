import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { ITemperature } from "@/utils/type";
import { useDataContext } from "@/context/DataContext";

const chartConfig = {
  temperature: {
    label: "Temperature",
    color: "#ff3131",
  },
} satisfies ChartConfig;

export function TemperatureChart() {
  const [chartData, setChartData] = useState<ITemperature[]>([]);
  const [sliceLimit, setSliceLimit] = useState<number>(
    window.innerWidth > 768 ? 20 : 7,
  );

  const { temperature } = useDataContext();
  const data: ITemperature[] = temperature;

  useEffect(() => {
    const handleResize = () => {
      // Update slice limit based on window width
      setSliceLimit(window.innerWidth > 768 ? 20 : 7);
    };
    // Listen for window resize event
    window.addEventListener("resize", handleResize);
    // Cleanup the event listener
    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    let tempData = data;
    if (!tempData) return;
    if (tempData.length > sliceLimit) {
      tempData = tempData.slice(tempData.length - sliceLimit - 1);
    }
    setChartData(tempData);
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold uppercase">Temperature</div>
          <select
            hidden
            className="rounded-lg bg-[#38b649] px-2 py-1 text-white"
          >
            <option className="bg-white text-black" value="hours">
              Hours
            </option>
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
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              right: 16,
            }}
          >
            <CartesianGrid />
            <YAxis axisLine={false} tickMargin={8} width={36} />

            <XAxis
              dataKey="hours"
              axisLine={false}
              tickMargin={10}
              angle={-50}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="temperature"
              type="linear"
              stroke="var(--color-temperature)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-temperature)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
