import Header from "@/components/Header.tsx";
import Navigation from "@/components/menu/Navigation.tsx";
import { authClient } from "@/lib/auth-client.ts";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/menu/")({
  beforeLoad: ({ context }) => {
    if (!context.session) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Menu | GYM APPLICATION" },
      { name: "description", content: "Menu s funkcemi aplikace" },
    ],
  }),
});

function RouteComponent() {
  const { data: session } = authClient.useSession();
  if (!session) return null;

  return (
    <>
      <Header page="MENU" />
      <Navigation />
    </>
  );
}
