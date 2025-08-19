import Header from "@/components/Header.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/treninky/$trainingId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { trainingId } = Route.useParams();

  return (
    <div className="pb-8">
      <Header page="TRÉNINK" />

      <div className="max-w-[500px] mx-auto w-[90%]">
        <p>{trainingId}"!</p>
      </div>
    </div>
  );
}
