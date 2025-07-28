import Header from "@/components/Header.tsx";
import TrainingsList from "@/components/treninky/TrainingsList.tsx";
import { authClient } from "@/lib/auth-client.ts";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/treninky/")({
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
      { title: "Tréninky | GYM APPLICATION" },
      { name: "description", content: "Seznam všech tréninků uživatele" },
    ],
  }),
});

function RouteComponent() {
  const { data: session } = authClient.useSession();
  if (!session) return null;

  return (
    <div>
      <Header page="TRÉNINKY" />
      <TrainingsList userId={session.user.id} />
    </div>
  );
}
