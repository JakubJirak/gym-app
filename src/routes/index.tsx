import About from "@/components/index/About.tsx";
import Contact from "@/components/index/Contact.tsx";
import Functions from "@/components/index/Functions.tsx";
import HeroSection from "@/components/index/HeroSection.tsx";
import News from "@/components/index/News.tsx";
import {ThemeSwitch} from "@/components/index/ThemeSwitch.tsx";
import {db} from "@/db";
import {testTable} from "@/db/schema.ts";
import {useQuery} from "@tanstack/react-query";
import {createFileRoute} from "@tanstack/react-router";
import {createServerFn} from "@tanstack/react-start";
import {useEffect} from "react";
import {GiWeightLiftingUp} from "react-icons/gi";

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
    <div className="text-center relative flex flex-col items-center max-w-[500px] mx-auto">
      <ThemeSwitch />
      <div className="absolute w-[80%] top-6 flex items-center gap-2">
        <GiWeightLiftingUp size={40} className="text-foreground" />
        <p className="text-2xl font-bold">GYM</p>
      </div>
      <HeroSection />
      <Functions />
      <About />
      <News />
      <Contact />
    </div>
  );
}
