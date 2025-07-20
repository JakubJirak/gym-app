import { Button } from "@/components/ui/button.tsx";
import { authClient } from "@/lib/auth-client.ts";
import { Link, useNavigate } from "@tanstack/react-router";
import { GiWeightLiftingUp } from "react-icons/gi";
import { MdLogout } from "react-icons/md";

interface HeaderProps {
  page: string;
}

const Header = ({ page }: HeaderProps) => {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();

  if (!session)
    return (
      <p className="text-center mt-10 text-lg">
        Pro přístup se musíš{" "}
        <Link to={"/login"} className="ml-2">
          <Button>PŘIHLÁSIT</Button>
        </Link>
      </p>
    );

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: "/" });
        },
      },
    });
  };

  return (
    <div className="bg-foreground grid grid-cols-[40px_1fr_auto_35px] justify-items-center items-center mb-6 px-3 h-18 justify-center max-w-[550px] mx-auto rounded-b-2xl">
      <Link to={"/menu"}>
        <GiWeightLiftingUp size={40} className="text-background" />
      </Link>
      <p className="text-background text-xl font-bold">{page}</p>
      <p className="text-background mr-4 text-lg">{session.user.name}</p>
      <Link to={"/"}>
        <Button onClick={handleSignOut} variant="secondary-icon" size="icon-lg">
          <MdLogout />
        </Button>
      </Link>
    </div>
  );
};

export default Header;
