import {createFileRoute} from '@tanstack/react-router'
import Header from "@/components/Header.tsx";

export const Route = createFileRoute("/statistiky/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header page="STATISTIKY" />
    </div>
  );
}
