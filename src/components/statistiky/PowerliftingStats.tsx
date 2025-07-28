import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { db } from "@/db";
import { userWeight } from "@/db/schema.ts";
import { authClient } from "@/lib/auth-client.ts";
import type { TrainingsType } from "@/routes/statistiky";
import { useQuery } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

interface PowerflitingStatsType {
  trainings: TrainingsType;
}

const fetchWeight = createServerFn({ method: "GET" })
  .validator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    return db
      .select()
      .from(userWeight)
      .where(eq(userWeight.userId, data.userId));
  });

const PowerliftingStats = ({ trainings }: PowerflitingStatsType) => {
  const { data: session } = authClient.useSession();
  const { data: weightData } = useQuery({
    queryKey: ["userWeight", session?.user.id],
    queryFn: () => fetchWeight({ data: { userId: session?.user.id ?? "" } }),
  });

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
        <CardTitle>
          {weightData === undefined || weightData.length === 0
            ? "Powerlifting PR (zadejte svoji váhu v profilu)"
            : `Powerlifting PR (${weightData[0].weight}kg BW)`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2 grid grid-cols-[1fr_1px_1fr_1px_1fr] gap-1">
            <div className="flex flex-col justify-center items-center gap-1">
              <p className="text-muted-foreground text-sm sm:text-base">
                Squat
              </p>
              <p>{squatPR}kg</p>
              {weightData === undefined || weightData.length === 0 ? null : (
                <p className="text-sm sm:text-base">
                  {(squatPR / Number(weightData[0].weight)).toFixed(2)}x BW
                </p>
              )}
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col justify-center items-center gap-1">
              <p className="text-muted-foreground text-center text-sm sm:text-base">
                Bench Press
              </p>
              <p className="text-center ">{benchPR}kg</p>
              {weightData === undefined || weightData.length === 0 ? null : (
                <p className="text-sm sm:text-base">
                  {(benchPR / Number(weightData[0].weight)).toFixed(2)}x BW
                </p>
              )}
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col justify-center items-center gap-1">
              <p className="text-muted-foreground text-sm sm:text-base">
                Deadlift
              </p>
              <p>{deadliftPR}kg</p>
              {weightData === undefined || weightData.length === 0 ? null : (
                <p className="text-sm sm:text-base">
                  {(deadliftPR / Number(weightData[0].weight)).toFixed(2)}x BW
                </p>
              )}
            </div>
          </div>
          <Separator />
          <div className="">
            <div className="space-y-2 grid gap-5">
              <div className="flex flex-col justify-center items-center gap-1">
                <p className="text-muted-foreground">TOTAL</p>
                <p>{total}kg</p>
                {weightData === undefined || weightData.length === 0 ? null : (
                  <p className="text-sm sm:text-base">
                    {(total / Number(weightData[0].weight)).toFixed(2)}x BW
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerliftingStats;
