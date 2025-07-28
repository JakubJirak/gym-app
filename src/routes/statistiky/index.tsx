import Header from "@/components/Header.tsx";
import OverallStats from "@/components/statistiky/OverallStats.tsx";
import PowerliftingStats from "@/components/statistiky/PowerliftingStats.tsx";
import { Card } from "@/components/ui/card.tsx";
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
    enabled: true,
  });

  if (isLoading)
    return (
      <>
        <Header page="STATISTIKY" />
        <p>Načítání dat</p>
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
    <div>
      <Header page="STATISTIKY" />
      <div className="max-w-[500px] mx-auto w-[90%] space-y-4">
        <OverallStats trainings={trainings} />
        <PowerliftingStats trainings={trainings} />
      </div>
    </div>
  );
}
