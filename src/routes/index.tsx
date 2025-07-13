import {ThemeSwitch} from "@/components/index/ThemeSwitch.tsx";
import {Button} from "@/components/ui/button.tsx";
import {db} from "@/db";
import {testTable} from "@/db/schema.ts";
import {useQuery} from "@tanstack/react-query";
import {createFileRoute, Link} from "@tanstack/react-router";
import {createServerFn} from "@tanstack/react-start";
import {useEffect} from "react";

export const Route = createFileRoute("/")({
  component: App,
});

const fetchData = createServerFn({ method: "GET" }).handler(async () => {
  const user = await db.select().from(testTable);
  return user;
});

function App() {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchData,
    enabled: true,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="text-center">
      <div className="flex mb-10 justify-center items-center gap-3 mt-5">
        <ThemeSwitch />
      </div>

      <div className="flex gap-3 justify-center">
        <Button>
          <Link to={"/login"}>Přihlaste se</Link>
        </Button>
        <Button variant="outline">
          <Link to={"/register"}>Vytvořte si účet</Link>
        </Button>
      </div>
    </div>
  );
}
