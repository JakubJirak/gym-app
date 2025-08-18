import Header from "@/components/Header.tsx";
import PowerliftingGoals from "@/components/powerlifting/PowerliftingGoals.tsx";
import PowerliftingStats from "@/components/powerlifting/PowerliftingStats.tsx";
import { authClient } from "@/lib/auth-client.ts";
import { fetchTrainings } from "@/utils/serverFn/trainings.ts";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/powerlifting/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Powerlifting| GYM APPLICATION" },
      { name: "description", content: "Powerlifting statistiky uživatele." },
    ],
  }),
});

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

  if (isLoading) return <Header page="POWERLIFTING" />;

  return (
    <>
      <Header page="POWERLIFTING" />
      <div className="max-w-[500px] w-[90%] mx-auto space-y-4 pb-8">
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
    </>
  );
}
