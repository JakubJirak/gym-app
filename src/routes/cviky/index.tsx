import Header from "@/components/Header.tsx";
import { ExerciseCombobox } from "@/components/treninky/ExerciseCombobox.tsx";
import { authClient } from "@/lib/auth-client.ts";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/cviky/")({
  beforeLoad: ({ context }) => {
    if (!context.session) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session } = authClient.useSession();
  if (!session) return null;

  return (
    <div>
      <Header page="CVIKY" />
      <ExerciseCombobox />
    </div>
  );
}
