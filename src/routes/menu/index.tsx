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
});

function RouteComponent() {
  const { data: session } = authClient.useSession();
  if (!session) return null;

  return (
    <>
      <div className="">
        <Header page="MENU" />
        <Navigation />
      </div>
    </>
  );
}
