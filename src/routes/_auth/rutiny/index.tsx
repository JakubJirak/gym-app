import Header from "@/components/Header.tsx";
import { authClient } from "@/lib/auth-client.ts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/rutiny/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Rutiny | GYM APPLICATION" },
      { name: "description", content: "Seznam všech rutin uživatele" },
    ],
  }),
});

function RouteComponent() {
  const { data: session } = authClient.useSession();
  if (!session) return null;

  return (
    <>
      <Header page="RUTINY" />
    </>
  );
}
