import type { TrainingsByIdType } from "@/utils/types/trainingsTypes";
import {
  Calendar,
  ChartColumnIncreasing,
  Repeat,
  TrendingUp,
  Weight,
} from "lucide-react";
import { useMemo } from "react";

interface TrainingStatsProps {
  trainingArr: TrainingsByIdType;
}

const TrainingStats = ({ trainingArr }: TrainingStatsProps) => {
  const training = trainingArr[0];

  const totalWeight = useMemo(
    () =>
      training.workoutExercises?.reduce(
        (exAcc, exercise) =>
          exAcc +
          exercise.sets.reduce(
            (setAcc, set) => setAcc + Number(set.weight ?? 0) * (set.reps ?? 0),
            0,
          ),
        0,
      ) ?? 0,
    [training.workoutExercises],
  );

  const allReps = useMemo(
    () =>
      training.workoutExercises?.reduce(
        (exAcc, exercise) =>
          exAcc +
          exercise.sets.reduce(
            (setAcc, set) => setAcc + Number(set.reps ?? 0),
            0,
          ),
        0,
      ) ?? 0,
    [training.workoutExercises],
  );

  const allSets = useMemo(
    () =>
      training.workoutExercises?.reduce(
        (exAcc, exercise) => exAcc + exercise.sets.length,
        0,
      ) ?? 0,
    [training.workoutExercises],
  );

  const allExercises = training.workoutExercises?.length ?? 0;

  return (
    <div>
      <p className="flex gap-3 items-center text-lg font-bold mb-4">
        <ChartColumnIncreasing />
        Celkové statistiky
      </p>
      <div className="grid gird-rows-2 grid-cols-2 gap-5">
        <div className="flex flex-col items-center justify-between gap-1 py-4 bg-secondary rounded-2xl text-center">
          <Calendar />
          <p className="mt-1 font-bold text-2xl">{allExercises}</p>
          <p className="text-muted-foreground">Cviky</p>
        </div>
        <div className="flex flex-col items-center py-4 justify-between gap-1 bg-secondary rounded-2xl text-center">
          <TrendingUp />
          <p className="mt-1 font-bold text-2xl">{allSets}</p>
          <p className="text-muted-foreground">Série</p>
        </div>
        <div className="flex flex-col items-center py-4 justify-between gap-1 bg-secondary rounded-2xl text-center">
          <Repeat />
          <p className="mt-1 font-bold text-2xl">{allReps}</p>
          <p className="text-muted-foreground">Opakovaní</p>
        </div>
        <div className="flex flex-col items-center py-4 justify-between gap-1 bg-secondary rounded-2xl text-center">
          <Weight />
          <p className="mt-1 font-bold text-2xl">{totalWeight}kg</p>
          <p className="text-muted-foreground">Váha</p>
        </div>
      </div>
    </div>
  );
};

export default TrainingStats;
