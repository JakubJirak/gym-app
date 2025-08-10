import About from "@/components/index/About.tsx";
import Contact from "@/components/index/Contact.tsx";
import Footer from "@/components/index/Footer.tsx";
import Functions from "@/components/index/Functions.tsx";
import HeroSection from "@/components/index/HeroSection.tsx";
import News from "@/components/index/News.tsx";
import { ThemeSwitch } from "@/components/index/ThemeSwitch.tsx";
import { createFileRoute } from "@tanstack/react-router";
import { GiWeightLiftingUp } from "react-icons/gi";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="text-center relative flex flex-col items-center max-w-[500px] mx-auto">
      <ThemeSwitch />
      <div className="absolute w-[80%] top-6 flex items-center gap-2">
        <GiWeightLiftingUp size={32} className="text-foreground" />
        <p className="text-2xl font-bold">GYM</p>
      </div>
      <HeroSection />
      <Functions />
      <About />
      <News />
      <Contact />
      <Footer />
    </div>
  );
}
