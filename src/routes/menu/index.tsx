import {createFileRoute} from "@tanstack/react-router";
import Navigation from "@/components/menu/Navigation.tsx";
import Header from "@/components/Header.tsx";

export const Route = createFileRoute("/menu/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header page="MENU" />
      <Navigation />
    </>
  );
}
