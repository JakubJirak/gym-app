import { ExerciseCombobox } from "@/components/treninky/ExerciseCombobox.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { db } from "@/db";
import { exercises } from "@/db/schema.ts";
import { authClient } from "@/lib/auth-client.ts";
import type { TrainingsType } from "@/routes/statistiky";
import { useQuery } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { History } from "lucide-react";
import { useState } from "react";

interface PowerflitingStatsType {
  trainings: TrainingsType;
}

type ExerciseSelect = {
  id: string;
  name: string;
};

type ExerciseSelectWithID = {
  id: string;
  userId: string | null;
  name: string;
};

const getExById = createServerFn({ method: "GET" })
  .validator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    return db.select().from(exercises).where(eq(exercises.userId, data.userId));
  });

const HistorySets = ({ trainings }: PowerflitingStatsType) => {
  const [selectedStatusesEx, setSelectedStatusesEx] =
    useState<ExerciseSelect | null>(null);
  const { data: session } = authClient.useSession();

  const { data: defaultExercises } = useQuery({
    queryKey: ["defaultExercises"],
    queryFn: () => getExById({ data: { userId: "default" } }),
  });

  const { data: customExercises } = useQuery({
    queryKey: ["customExercises", session?.user.id],
    queryFn: () => getExById({ data: { userId: session?.user.id ?? "" } }),
    enabled: !!session,
  });

  const exercises: ExerciseSelectWithID[] = [
    ...(customExercises ?? []),
    ...(defaultExercises ?? []),
  ];

  const getSetsById = (id: string) => {
    return trainings
      ?.flatMap((training) => training.workoutExercises)
      .filter((exercise) => exercise.exerciseId === id)
      .flatMap((exercise) => exercise.sets);
  };

  const sets = getSetsById(selectedStatusesEx?.id ?? "");

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <p className="flex gap-3 items-center">
              <History />
              Historie cviku
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ExerciseCombobox
            selectedStatus={selectedStatusesEx}
            setSelectedStatus={setSelectedStatusesEx}
            exerciseId="a"
            exercises={exercises}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div>
            {sets?.map((set) => (
              <div key={set.id}>
                <div
                  className={` ${(set.order ?? 1 > 0) ? "mt-0 rounded-b-xl pt-10 mt-[-41px] border border-t-transparent border-border" : "mt-3 border border-border"} p-2 px-3 bg-secondary rounded-xl flex gap-0.5`}
                >
                  <p>{set.order ? set.order + 1 : 1}. série</p>
                  <p className="ml-auto font-bold">{set.weight}</p>
                  <p className="font-bold">×</p>
                  <p className="font-bold">{set.reps}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistorySets;
