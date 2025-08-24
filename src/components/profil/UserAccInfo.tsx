import { Separator } from "@/components/ui/separator.tsx";
import { authClient } from "@/lib/auth-client.ts";

const UserAccInfo = () => {
  const { data: session } = authClient.useSession();

  if (!session) return null;

  return (
    <div className="p-2">
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
    </div>
  );
};

export default UserAccInfo;
