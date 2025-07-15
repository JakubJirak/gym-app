import Header from "@/components/Header.tsx";
import AddTraining from "@/components/treninky/AddTraining";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/treninky/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header page="TRÉNINKY" />
      <AddTraining />
    </div>
  );
}
