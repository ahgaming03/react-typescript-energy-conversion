import {
  CartesianGrid,
  LabelList,
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
export const description = "A line chart with a label";
const chartData = [
  { hours: "8:00", temperature: 75 },
  { hours: "9:00", temperature: 95 },
  { hours: "10:00", temperature: 96 },
  { hours: "11:00", temperature: 95 },
  { hours: "12:00", temperature: 95 },
  { hours: "13:00", temperature: 94 },
  { hours: "14:00", temperature: 96 },
  { hours: "15:00", temperature: 96 },
  { hours: "16:00", temperature: 95 },
  { hours: "17:00", temperature: 97 },
  { hours: "18:00", temperature: 96 },
  { hours: "19:00", temperature: 72 },
  { hours: "20:00", temperature: 54 },
];
const chartConfig = {
  temperature: {
    label: "Temperature",
    color: "#ff3131",
  },
} satisfies ChartConfig;

export function TemperatureChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold uppercase">Temperature</div>
          <select className="rounded-lg bg-[#38b649] px-2 py-1 text-white">
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
              dataKey="temperature"
              axisLine={false}
              tickMargin={8}
              width={36}
            />

            <XAxis
              dataKey="hours"
              axisLine={false}
              tickMargin={10}
              angle={-50}
              // tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="temperature"
              type="natural"
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
