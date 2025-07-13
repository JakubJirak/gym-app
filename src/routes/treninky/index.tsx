import {createFileRoute} from '@tanstack/react-router'
import Header from "@/components/Header.tsx";

export const Route = createFileRoute("/treninky/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header page="TRENINKY" />
    </div>
  );
}
