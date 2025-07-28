import Header from "@/components/Header.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
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

function RouteComponent() {
  const { data: session } = authClient.useSession();

  const { data: trainings, isLoading } = useQuery({
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
      <div className="max-w-[500px] mx-auto w-[90%]">
        <Card>
          <CardHeader>
            <CardTitle>Celkové statistiky</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-muted-foreground">Počet všech tréninků</p>
                <p>{trainings.length}</p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground">Počet všech cviků</p>
                <p>{allExercises}</p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground">Počet všech sérií</p>
                <p>{allSets}</p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground">Celková zvednutá váha</p>
                <p>{allWeight}kg</p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground">Celkový počet opakování</p>
                <p>{allReps}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
