import Header from "@/components/Header.tsx";
import AddTraining from "@/components/treninky/AddTraining";
import Training from "@/components/treninky/Training.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/treninky/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header page="TRÉNINKY" />
      <AddTraining />
      <div className="w-[90%] max-w-[500px] mx-auto gap-4 flex flex-col justify-center mt-4">
        <Training />
      </div>
    </div>
  );
}
