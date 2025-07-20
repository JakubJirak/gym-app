import Header from "@/components/Header.tsx";
import { Button } from "@/components/ui/button.tsx";
import { authClient } from "@/lib/auth-client.ts";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profil/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session } = authClient.useSession();
  if (!session)
    return (
      <p className="text-center mt-10 text-lg">
        Pro přístup se musíš{" "}
        <Link to={"/login"} className="ml-2">
          <Button>PŘIHLÁSIT</Button>
        </Link>
      </p>
    );

  return (
    <div>
      <Header page="PROFIL" />
    </div>
  );
}
