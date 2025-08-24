import Header from "@/components/Header.tsx";
import HistorySets from "@/components/statistiky/history/HistorySets.tsx";
import MuscleGroupStats from "@/components/statistiky/musclegroup/MuscleGroupStats.tsx";
import OverallStats from "@/components/statistiky/stats/OverallStats.tsx";
import { Card } from "@/components/ui/card.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { authClient } from "@/lib/auth-client.ts";
import { fetchTrainings } from "@/utils/serverFn/trainings.ts";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/statistiky/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Statistiky | GYM APPLICATION" },
      { name: "description", content: "Seznam všech statistik uživatele" },
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

  if (isLoading) return <Header page="STATISTIKY" />;

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
        defaultValue="stats"
        className="max-w-[500px] mx-auto w-[90%] space-y-3"
      >
        <TabsList className="w-full bg-secondary">
          <TabsTrigger value="stats">Celkově</TabsTrigger>
          <TabsTrigger value="musclegroup">Podle partie</TabsTrigger>
          <TabsTrigger value="history">Historie</TabsTrigger>
        </TabsList>
        <TabsContent value="stats">
          <OverallStats trainings={trainings} />
        </TabsContent>
        <TabsContent value="musclegroup">
          <MuscleGroupStats trainings={trainings} />
        </TabsContent>
        <TabsContent value="history">
          <HistorySets trainings={trainings} />
        </TabsContent>
      </Tabs>
    </>
  );
}
