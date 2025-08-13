import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import type { TrainingsType } from "@/routes/statistiky";
import {
  Calendar,
  ChartColumnIncreasing,
  Repeat,
  TrendingUp,
  Weight,
} from "lucide-react";

interface OverallStatsType {
  trainings: TrainingsType;
}

const OverallStats = ({ trainings }: OverallStatsType) => {
  const allSets = trainings?.reduce(
    (acc, training) =>
      acc +
      training.workoutExercises.reduce(
        (exAcc, exercise) => exAcc + exercise.sets.length,
        0,
      ),
    0,
  );

  const allWeight = trainings?.reduce(
    (acc, training) =>
      acc +
      training.workoutExercises.reduce(
        (exAcc, exercise) =>
          exAcc +
          exercise.sets.reduce(
            (setAcc, set) => setAcc + Number(set.weight ?? 0) * (set.reps ?? 0),
            0,
          ),
        0,
      ),
    0,
  );

  const allReps = trainings?.reduce(
    (acc, training) =>
      acc +
      training.workoutExercises.reduce(
        (exAcc, exercise) =>
          exAcc +
          exercise.sets.reduce(
            (setAcc, set) => setAcc + Number(set.reps ?? 0),
            0,
          ),
        0,
      ),
    0,
  );

  const totalWeight = (allWeight / 100).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <p className="flex gap-3 items-center">
            <ChartColumnIncreasing />
            Celkové statistiky
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gird-rows-2 grid-cols-2 gap-4">
          <div className="flex flex-col items-center py-4 gap-2 bg-secondary rounded-2xl text-center">
            <Calendar />
            <p className="font-bold text-2xl">{trainings?.length}</p>
            <p className="text-muted-foreground">Tréninky</p>
          </div>
          <div className="flex flex-col items-center py-4 gap-2 bg-secondary rounded-2xl text-center">
            <TrendingUp />
            <p className="font-bold text-2xl">{allSets}</p>
            <p className="text-muted-foreground">Série</p>
          </div>
          <div className="flex flex-col items-center py-4 gap-2 bg-secondary rounded-2xl text-center">
            <Weight />
            <p className="font-bold text-2xl">{totalWeight}t</p>
            <p className="text-muted-foreground">Váha</p>
          </div>
          <div className="flex flex-col items-center py-4 gap-2 bg-secondary rounded-2xl text-center">
            <Repeat />
            <p className="font-bold text-2xl">{allReps}</p>
            <p className="text-muted-foreground">Opakovaní</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverallStats;
