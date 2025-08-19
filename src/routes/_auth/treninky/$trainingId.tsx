import Header from "@/components/Header.tsx";
import TrainingInfo from "@/components/treninky/trenink/TrainingInfo.tsx";
import { authClient } from "@/lib/auth-client.ts";
import { fetchTrainingsById } from "@/utils/serverFn/trainings.ts";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/treninky/$trainingId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { trainingId } = Route.useParams();
  const { data: session } = authClient.useSession();

  const { data: training } = useQuery({
    queryKey: ["workouts", session?.user.id, trainingId],
    queryFn: () =>
      fetchTrainingsById({
        data: { userId: session?.user.id ?? "", trainingId: trainingId },
      }),
    enabled: !!session && !!trainingId,
  });

  if (!session) return null;
  if (training === undefined) return null;

  return (
    <div className="pb-8">
      <Header page={training[0].name} />

      <div className="max-w-[500px] mx-auto w-[90%]">
        <TrainingInfo trainingArr={training} />
      </div>
    </div>
  );
}
