import { CustomTooltip } from "@/components/statistiky/CustomTooltip.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

interface chartProps {
  historySets: ({
    id: string;
    date: string;
    sets: {
      id: string;
      order: number | null;
      workoutExerciseId: string | null;
      weight: string | null;
      reps: number | null;
    }[];
  } | null)[];
}

const ChartFirstSets = ({ historySets }: chartProps) => {
  const sortedHistorySets = [...historySets]
    .filter(Boolean)
    .sort(
      (a, b) =>
        new Date(a?.date ? a.date : "2025-01-01").getTime() -
        new Date(b?.date ? b.date : "2025-01-01").getTime(),
    );

  const maxWeightPerSets = sortedHistorySets.map((set) => {
    if (!set) return null;
    const weights = set.sets
      .map((s) => Number(s.weight))
      .filter((w) => !Number.isNaN(w));
    return weights.length ? Math.max(...weights) : null;
  });

  const chartData = sortedHistorySets
    .map((set, idx) => {
      if (set && maxWeightPerSets[idx] !== null) {
        return {
          date: set.date,
          value: maxWeightPerSets[idx],
          reps: set.sets[0].reps,
        };
      }
      return null;
    })
    .filter(Boolean);

  const chartConfig = {
    weight: {
      label: "Vaha",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full ">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 40,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value);
                const len = date.toLocaleDateString().length;
                return date.toLocaleDateString().slice(0, len - 4);
              }}
            />
            <ChartTooltip content={(props) => <CustomTooltip {...props} />} />
            <Bar dataKey="value" fill="#2563eb" radius={4}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartFirstSets;
