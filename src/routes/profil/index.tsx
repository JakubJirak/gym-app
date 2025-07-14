import {createFileRoute} from '@tanstack/react-router'
import Header from "@/components/Header.tsx";

export const Route = createFileRoute("/profil/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header page="PROFIL" />
    </div>
  );
}
