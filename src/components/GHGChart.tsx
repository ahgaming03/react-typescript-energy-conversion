import {
  Area,
  AreaChart,
  CartesianGrid,
  // LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

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

import { useDataContext } from "@/context/DataContext";

const chartConfig = {
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

const numberShows = { mobile: 7, PC: 20 };

export function GHGAreaChart() {
  const [chartData, setChartData] = useState<IGHG[]>([]);
  const [sliceLimit, setSliceLimit] = useState<number>(
    window.innerWidth > 768 ? 20 : 7,
  );
  const { GHG } = useDataContext();

  const data: IGHG[] = GHG;

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
      tempData = tempData.slice(tempData.length - sliceLimit);
    }
    setChartData(tempData);
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold uppercase">Greenhouse Gas</div>
          <select
            hidden
            className="rounded-lg bg-[#38b649] px-2 py-1 text-white"
          >
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
              left: 16,
              right: 16,
              top: 12,
            }}
            stackOffset="expand"
          >
            <CartesianGrid />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              angle={-50}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <defs>
              {Object.entries(chartConfig).map(([key, value]) => (
                <linearGradient
                  key={key}
                  id={`fill${value.label}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={value.color} stopOpacity={0.8} />
                  <stop
                    offset="95%"
                    stopColor={value.color}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            {Object.entries(chartConfig).map(([key, value]) => (
              <Area
                key={key}
                dataKey={value.label}
                type="linear"
                fill={`url(#fill${value.label})`}
                fillOpacity={0.4}
                stroke={value.color}
                stackId="GHG"
                dot={true}
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export const GHGLineChart = () => {
  const [chartData, setChartData] = useState<IGHG[]>([]);
  const [sliceLimit, setSliceLimit] = useState<number>(
    window.innerWidth > 768 ? numberShows.PC : numberShows.mobile,
  );

  const { GHG } = useDataContext();
  const data: IGHG[] = GHG;

  useEffect(() => {
    const handleResize = () => {
      // Update slice limit based on window width
      setSliceLimit(
        window.innerWidth > 768 ? numberShows.PC : numberShows.mobile,
      );
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
      tempData = tempData.slice(tempData.length - sliceLimit);
    }
    setChartData(tempData);
  }, [data]);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold uppercase">Greenhouse Gas</div>
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
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                width={40}
                tickFormatter={(value = 0) => value}
              />
              <XAxis
                dataKey="hours"
                axisLine={false}
                tickMargin={10}
                angle={-50}
                tickFormatter={(value = 0) => value}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              {Object.entries(chartConfig).map(([key, value]) => (
                <Line
                  key={key}
                  dataKey={value.label}
                  type="linear"
                  stroke={value.color}
                  strokeWidth={2}
                  dot={{
                    fill: value.color,
                  }}
                  activeDot={{
                    r: 6,
                  }}
                >
                  {/* <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  /> */}
                </Line>
              ))}

              <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
};
