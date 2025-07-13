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
        <Link to={"/login"}>
          <Button className="cursor-pointer">Prihlaste se</Button>
        </Link>
        <Link to={"/menu"}>
          <Button className="cursor-pointer">Menu</Button>
        </Link>
        <Link to={"/register"}>
          <Button variant="outline" className="cursor-pointer">
            Vytvořte si účet
          </Button>
        </Link>
      </div>
    </div>
  );
}
