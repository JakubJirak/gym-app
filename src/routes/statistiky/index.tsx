import Header from "@/components/Header.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";
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
});

const fetchTrainings = createServerFn({ method: "GET" })
  .validator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    const trainings = await db.query.workouts.findMany({
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
    return trainings;
  });

// const fetchByExercise = createServerFn({ method: "GET" }).validator(
//   (data: { userId: string; exerciseId: string }) => data,
// );

function RouteComponent() {
  const { data: session } = authClient.useSession();

  const { data: trainings } = useQuery({
    queryKey: ["workouts", session?.user.id],
    queryFn: () => fetchTrainings({ data: { userId: session?.user.id ?? "" } }),
    enabled: true,
  });

  const allExercises = trainings?.reduce(
    (acc, training) => acc + training.workoutExercises.length,
    0,
  );

  const allSets = trainings?.reduce(
    (acc, training) =>
      acc +
      training.workoutExercises.reduce(
        (exAcc, exercise) => exAcc + exercise.sets.length,
        0,
      ),
    0,
  );

  if (trainings === undefined || trainings.length === 0)
    return (
      <>
        <Header page="STATISTIKY" />
        <div className="max-w-[500px] mx-auto w-[90%]">
          <Card className="p-4">
            <p>Pro zobrazeni statistik nejprve musite vytvorit trenink</p>
          </Card>
        </div>
      </>
    );

  return (
    <div>
      <Header page="STATISTIKY" />
      <div className="max-w-[500px] mx-auto w-[90%]">
        <Card className="p-4">
          <CardContent className="px-2">
            <div className="space-y-2">
              <div>
                <p className="text-muted-foreground">Počet tréninků</p>
                <p>{trainings.length}</p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground">Počet cviků</p>
                <p>{allExercises}</p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground">Počet sérií</p>
                <p>{allSets}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
