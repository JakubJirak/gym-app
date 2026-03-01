import { Button } from "@/components/ui/button.tsx";
import { Link } from "@tanstack/react-router";

const HeroSection = () => {
  return (
    <section className="pb-20 flex flex-col items-center">
      <h1 className="text-3xl text-left w-[80%] mt-[13dvh] mx-auto font-bold">
        Toto je stará verze aplikace GYM TRACKER.
      </h1>
      <a href="https://gymtracker.jirak.dev/" className="mt-8 text-2xl  text-primary underline">
        Nová verze aplikace je dostupná zde
      </a>
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
    </section>
  );
};

export default HeroSection;
