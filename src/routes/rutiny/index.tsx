import Header from "@/components/Header.tsx";
import { authClient } from "@/lib/auth-client.ts";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/rutiny/")({
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
      { title: "Rutiny | GYM APPLICATION" },
      { name: "description", content: "Seznam všech rutin uživatele" },
    ],
  }),
});

function RouteComponent() {
  const { data: session } = authClient.useSession();
  if (!session) return null;

  return (
    <div>
      <Header page="RUTINY" />
    </div>
  );
}
