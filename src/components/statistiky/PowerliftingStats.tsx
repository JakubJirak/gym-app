import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import type { TrainingsType } from "@/routes/statistiky";

interface PowerflitingStatsType {
  trainings: TrainingsType;
}

const PowerliftingStats = ({ trainings }: PowerflitingStatsType) => {
  const getSetsById = (id: string): number[] => {
    return trainings
      ?.flatMap((training) => training.workoutExercises)
      .filter((exercise) => exercise.exerciseId === id)
      .flatMap((exercise) => exercise.sets)
      .flatMap((set) => Number(set.weight));
  };

  const maxWeight = (arr: number[]): number => {
    if (arr.length === 0) return 0;
    return Math.max(...arr);
  };

  const squatPR = maxWeight(getSetsById("sq"));
  const benchPR = maxWeight(getSetsById("bp"));
  const deadliftPR = maxWeight(getSetsById("dl"));
  const total = squatPR + benchPR + deadliftPR;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Powerlifting PR</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2 grid grid-cols-[1fr_10px_1fr_10px_1fr] gap-5">
            <div className="flex flex-col justify-center items-center">
              <p className="text-muted-foreground">Squat</p>
              <p>{squatPR}kg</p>
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col justify-center items-center">
              <p className="text-muted-foreground">Bench Press</p>
              <p>{benchPR}kg</p>
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col justify-center items-center">
              <p className="text-muted-foreground">Deadlift</p>
              <p>{deadliftPR}kg</p>
            </div>
          </div>
          <Separator />
          <div className="">
            <div className="space-y-2 grid gap-5">
              <div className="flex flex-col justify-center items-center">
                <p className="text-muted-foreground">TOTAL</p>
                <p>{total}kg</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerliftingStats;
