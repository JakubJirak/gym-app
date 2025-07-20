import Header from "@/components/Header.tsx";
import TrainingsList from "@/components/treninky/TrainingsListComp/TrainingsList.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/treninky/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header page="TRÉNINKY" />
      <TrainingsList />
    </div>
  );
}
