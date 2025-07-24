import Header from "@/components/Header.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { authClient } from "@/lib/auth-client.ts";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/profil/")({
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
      <Header page="PROFIL" />
      <div className="max-w-[500px] w-[90%] mx-auto">
        <Card className="p-4">
          <CardContent className="px-2">
            <div className="space-y-2">
              <div>
                <p className="text-muted-foreground">Uživatelské jméno</p>
                <p>{session.user.name}</p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground">Email</p>
                <p>{session.user.email}</p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground">Založení účtu</p>
                <p>{session.user.createdAt.toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
