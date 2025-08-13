import Header from "@/components/Header.tsx";
import HistorySets from "@/components/statistiky/history/HistorySets.tsx";
import PowerliftingGoals from "@/components/statistiky/powerlifting/PowerliftingGoals.tsx";
import PowerliftingStats from "@/components/statistiky/powerlifting/PowerliftingStats.tsx";
import OverallStats from "@/components/statistiky/stats/OverallStats.tsx";
import { Card } from "@/components/ui/card.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { db } from "@/db";
import { authClient } from "@/lib/auth-client.ts";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/statistiky/")({
  beforeLoad: ({ context }) => {
    if (!context.session) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Statistiky | GYM APPLICATION" },
      { name: "description", content: "Seznam všech statistik uživatele" },
    ],
  }),
});

const fetchTrainings = createServerFn({ method: "GET" })
  .validator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    return await db.query.workouts.findMany({
      orderBy: (workout, { desc }) => [desc(workout.workoutDate)],
      where: (workout, { eq }) => eq(workout.userId, data.userId),
      with: {
        workoutExercises: {
          orderBy: (set, { asc }) => [asc(set.order)],
          with: {
            sets: {
              orderBy: (set, { asc }) => [asc(set.order)],
            },
            exercise: true,
          },
        },
      },
    });
  });

export type TrainingsType = Awaited<ReturnType<typeof fetchTrainings>>;

function RouteComponent() {
  const { data: session } = authClient.useSession();

  const { data: trainings, isLoading } = useQuery({
    queryKey: ["workouts", session?.user.id],
    queryFn: () => fetchTrainings({ data: { userId: session?.user.id ?? "" } }),
    enabled: !!session,
  });

  const getSetsById = (id: string): number[] => {
    if (trainings !== undefined) {
      return trainings
        ?.flatMap((training) => training.workoutExercises)
        .filter((exercise) => exercise.exerciseId === id)
        .flatMap((exercise) => exercise.sets)
        .flatMap((set) => Number(set.weight));
    }
    return [];
  };

  const maxWeight = (arr: number[]): number => {
    if (arr.length === 0) return 0;
    return Math.max(...arr);
  };

  const squatPR = maxWeight(getSetsById("sq"));
  const benchPR = maxWeight(getSetsById("bp"));
  const deadliftPR = maxWeight(getSetsById("dl"));

  if (isLoading)
    return (
      <>
        <Header page="STATISTIKY" />
      </>
    );

  if (trainings === undefined || trainings.length === 0)
    return (
      <>
        <Header page="STATISTIKY" />
        <div className="max-w-[500px] mx-auto w-[90%]">
          <Card className="p-4 text-center">
            <p>Pro zobrazení statistik musíte nejprve vytvořit trénink</p>
          </Card>
        </div>
      </>
    );

  return (
    <>
      <Header page="STATISTIKY" />

      <Tabs
        defaultValue="powerlifting"
        className="max-w-[500px] mx-auto w-[90%] space-y-4 pb-8"
      >
        <TabsList className="w-full bg-secondary">
          <TabsTrigger value="powerlifting">Powerlifting</TabsTrigger>
          <TabsTrigger value="stats">Statistiky</TabsTrigger>
          <TabsTrigger value="history">Historie</TabsTrigger>
        </TabsList>
        <TabsContent value="powerlifting">
          <div className="space-y-4">
            <PowerliftingStats
              benchPR={benchPR}
              deadliftPR={deadliftPR}
              squatPR={squatPR}
            />
            <PowerliftingGoals
              benchPR={benchPR}
              deadliftPR={deadliftPR}
              squatPR={squatPR}
            />
          </div>
        </TabsContent>
        <TabsContent value="stats">
          <OverallStats trainings={trainings} />
        </TabsContent>
        <TabsContent value="history">
          <HistorySets trainings={trainings} />
        </TabsContent>
      </Tabs>
    </>
  );
}
