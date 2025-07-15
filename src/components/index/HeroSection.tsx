import { Button } from "@/components/ui/button.tsx";
import { Link } from "@tanstack/react-router";

const HeroSection = () => {
  return (
    <div className="h-[100dvh] flex flex-col items-center">
      <h1 className="text-[5.3dvh]/[6.7dvh] text-left w-[80%] mt-[13dvh] mx-auto font-bold">
        Získejte kontrolu nad svým tréninkem
      </h1>
      <p className="tracking-wider font-light text-[2.8dvh]/[4.7dvh] text-left w-[80%] mx-auto mt-[4dvh]">
        Jednoduše si zapisujte tréninky a sledujte svůj progres v přehledných
        statistikách a souhrnech. Profesionální nástroj pro každého, kdo to s
        pohybem myslí vážně.
      </p>
      <div className="flex flex-col gap-[2dvh] w-[80%] mx-auto mt-[6dvh] justify-between">
        <Link to={"/login"} className="inline-flex">
          <Button size="xl" className="cursor-pointer">
            Přihlaste se
          </Button>
        </Link>
        <Link to={"/register"} className="inline-flex">
          <Button size="xl" variant="outline" className="cursor-pointer">
            Vytvořte si účet
          </Button>
        </Link>
      </div>
      <Link to={"/menu"} className="inline-flex mt-10 absolute">
        <Button className="cursor-pointer">Menu</Button>
      </Link>
    </div>
  );
};

export default HeroSection;
