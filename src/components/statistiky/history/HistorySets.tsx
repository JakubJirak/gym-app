import ChartFirstSets from "@/components/statistiky/history/ChartFirstSets.tsx";
import HistorySet from "@/components/statistiky/history/HistorySet.tsx";
import { ExerciseCombobox } from "@/components/treninky/ExerciseCombobox.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { authClient } from "@/lib/auth-client.ts";
import { getExById } from "@/utils/serverFn/trainings.ts";
import type {
  ExerciseSelect,
  ExerciseSelectWithID,
  TrainingsType,
} from "@/utils/types/trainingsTypes.ts";
import { useQuery } from "@tanstack/react-query";
import { History } from "lucide-react";
import { useState } from "react";

interface PowerflitingStatsType {
  trainings: TrainingsType;
}

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
    <div className="space-y-4 p-1">
      <div>
        <p className="flex gap-3 items-center text-lg font-bold pb-4">
          <History />
          Historie cviku
        </p>

        <ExerciseCombobox
          selectedStatus={selectedStatusesEx}
          setSelectedStatus={setSelectedStatusesEx}
          exerciseId="a"
          exercises={exercises}
        />
      </div>

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
