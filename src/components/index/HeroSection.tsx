import {Button} from "@/components/ui/button.tsx";
import {Link} from "@tanstack/react-router";

const HeroSection = () => {
  return (
    <div className="h-[100dvh] max-w-[500px] flex flex-col items-center">
      <h1 className="text-5xl text-left w-[80%] mx-auto font-bold mt-[17dvh]">
        Získejte kontrolu nad svým tréninkem
      </h1>
      <p className="tracking-wider font-light text-xl/8 text-left w-[80%] mx-auto mt-[6dvh]">
        Jednoduše si zapisujte tréninky a sledujte svůj progres v přehledných
        statistikách a souhrnech. Profesionální nástroj pro každého, kdo to s
        pohybem myslí vážně.
      </p>
      <div className="flex flex-col gap-[2dvh] w-[80%] mx-auto mt-[10dvh] justify-between">
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
      <Link to={"/menu"} className="inline-flex mt-20">
        <Button className="cursor-pointer">Menu</Button>
      </Link>
    </div>
  );
};

export default HeroSection;
