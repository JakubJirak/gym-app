import ChartFirstSets from "@/components/statistiky/history/ChartFirstSets.tsx";
import HistorySet from "@/components/statistiky/history/HistorySet.tsx";
import { ExerciseCombobox } from "@/components/treninky/ExerciseCombobox.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
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
    enabled: !!session,
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

  const getHistoryOfSetsById = (id: string) => {
    return trainings
      ?.map((training) => {
        const cvik = training.workoutExercises.find((e) => e.exerciseId === id);
        if (cvik) {
          return {
            id: training.id,
            date: training.workoutDate,
            sets: cvik.sets,
          };
        }
        return null;
      })
      .filter(Boolean);
  };

  const historySets = getHistoryOfSetsById(selectedStatusesEx?.id ?? "");

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

      {selectedStatusesEx && (
        <>
          <ChartFirstSets historySets={historySets} />

          <Card>
            <CardContent>
              {historySets.length === 0 && (
                <p className="text-center text-muted-foreground">
                  Pro tento cvik nemáte žádnou sérii
                </p>
              )}
              <ScrollArea className="max-h-100 overflow-y-auto">
                <div className="space-y-4">
                  {historySets.map((history) => (
                    <HistorySet
                      key={history?.id}
                      date={history?.date}
                      sets={history?.sets}
                    />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default HistorySets;
