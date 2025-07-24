import { Card } from "@/components/ui/card.tsx";
import { Link } from "@tanstack/react-router";
import { FaUser } from "react-icons/fa6";
import { GiWeightLiftingUp } from "react-icons/gi";
import { IoIosStats } from "react-icons/io";
import { LuClipboardList, LuDumbbell } from "react-icons/lu";

const Navigation = () => {
  return (
    <div className="flex max-w-[500px] w-[90%] mx-auto gap-6 mt-3 flex-col mb-6">
      <Link to={"/treninky"}>
        <Card className="flex flex-row px-8 items-center">
          <GiWeightLiftingUp size={40} />
          <p className="text-2xl ml-2">TRÉNINKY</p>
        </Card>
      </Link>
      <Link to={"/statistiky"}>
        <Card className="flex flex-row px-8 items-center">
          <IoIosStats size={40} />
          <p className="text-2xl ml-2">STATISTIKY</p>
        </Card>
      </Link>
      <Link to={"/rutiny"}>
        <Card className="flex flex-row px-8 items-center">
          <LuClipboardList size={40} />
          <p className="text-2xl ml-2">RUTINY</p>
        </Card>
      </Link>
      <Link to={"/cviky"}>
        <Card className="flex flex-row px-8 items-center">
          <LuDumbbell size={40} />
          <p className="text-2xl ml-2">CVIKY</p>
        </Card>
      </Link>
      <Link to={"/profil"}>
        <Card className="flex flex-row px-8 items-center">
          <FaUser size={40} />
          <p className="text-2xl ml-2">PROFIL</p>
        </Card>
      </Link>
    </div>
  );
};

export default Navigation;
