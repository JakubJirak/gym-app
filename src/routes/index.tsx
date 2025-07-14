import HeroSection from "@/components/index/HeroSection.tsx";
import {ThemeSwitch} from "@/components/index/ThemeSwitch.tsx";
import {db} from "@/db";
import {testTable} from "@/db/schema.ts";
import {useQuery} from "@tanstack/react-query";
import {createFileRoute} from "@tanstack/react-router";
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
    <div className="text-center relative flex flex-col items-center">
      <ThemeSwitch />
      <HeroSection />
    </div>
  );
}
