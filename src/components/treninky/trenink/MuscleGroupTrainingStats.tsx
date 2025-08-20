import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { TrainingsByIdType } from "@/utils/types/trainingsTypes";
import { ChartColumnIncreasing } from "lucide-react";
import { Pie, PieChart } from "recharts";

interface TrainingStatsProps {
  trainingArr: TrainingsByIdType;
}
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  Chest: {
    label: "Chest",
    color: "var(--chart-1)",
  },
  Shoulders: {
    label: "Shoulders",
    color: "var(--chart-2)",
  },
  Triceps: {
    label: "Triceps",
    color: "var(--chart-3)",
  },
  Biceps: {
    label: "Biceps",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
  "var(--chart-8)",
  "var(--chart-9)",
  "var(--chart-10)",
];

const MuscleGroupTrainingStats = ({ trainingArr }: TrainingStatsProps) => {
  const training = trainingArr[0];

  const muscleGroupCounts = training.workoutExercises.reduce(
    (acc: Record<string, number>, exercise) => {
      const muscleGroup = exercise.exercise?.muscleGroup?.muscleGroup ?? "";
      if (muscleGroup) {
        acc[muscleGroup] = (acc[muscleGroup] || 0) + 1;
      }
      return acc;
    },
    {},
  );

  const muscleGroupStats = Object.entries(muscleGroupCounts).map(
    ([muscleGroup, number], index) => ({
      muscleGroup,
      number,
      fill: COLORS[index % COLORS.length],
    }),
  );

  return (
    <div>
      <p className="flex gap-3 items-center text-lg font-bold mb-4">
        <ChartColumnIncreasing />
        Statistiky podle partie
      </p>

      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Pie data={muscleGroupStats} dataKey="number" nameKey="muscleGroup" />
        </PieChart>
      </ChartContainer>

      <div className="grid grid-cols-2 gap-1">
        {muscleGroupStats.map((muscleGroup) => (
          <div
            key={muscleGroup.muscleGroup}
            className="grid grid-cols-[20px_80px_auto] items-center"
          >
            <div
              style={{ backgroundColor: muscleGroup.fill }}
              className="size-4 rounded-full"
            />
            <p>{muscleGroup.muscleGroup}</p>
            <p>{muscleGroup.number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MuscleGroupTrainingStats;
