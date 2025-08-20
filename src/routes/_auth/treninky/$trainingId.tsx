import Header from "@/components/Header.tsx";
import MuscleGroupTrainingStats from "@/components/treninky/trenink/MuscleGroupTrainingStats";
import TrainingInfo from "@/components/treninky/trenink/TrainingInfo.tsx";
import TrainingStats from "@/components/treninky/trenink/TrainingStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

      <Tabs
        defaultValue="cviky"
        className="max-w-[500px] mx-auto w-[90%] space-y-3"
      >
        <TabsList className="w-full bg-secondary">
          <TabsTrigger value="cviky">Cviky</TabsTrigger>
          <TabsTrigger value="statistiky">Statistiky</TabsTrigger>
        </TabsList>
        <TabsContent value="cviky">
          <TrainingInfo trainingArr={training} />
        </TabsContent>
        <TabsContent value="statistiky">
          <div className="space-y-6">
            <TrainingStats trainingArr={training} />
            <MuscleGroupTrainingStats trainingArr={training} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
