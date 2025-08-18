import { Card } from "@/components/ui/card.tsx";
import { Link } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { GiWeightLiftingUp } from "react-icons/gi";
import { IoIosStats } from "react-icons/io";
import { LuClipboardList, LuDumbbell } from "react-icons/lu";

const Navigation = () => {
  return (
    <div className="flex max-w-[500px] w-[90%] mx-auto gap-3.5 mt-3 flex-col pb-8">
      <Link to={"/treninky"}>
        <Card className="flex flex-row p-3 items-center">
          <GiWeightLiftingUp size={35} />
          <p className="text-xl">TRÉNINKY</p>
        </Card>
      </Link>
      <Link to={"/statistiky"}>
        <Card className="flex flex-row p-3 items-center">
          <IoIosStats size={35} />
          <p className="text-xl">STATISTIKY</p>
        </Card>
      </Link>
      <Link to={"/kalendar"}>
        <Card className="flex flex-row p-3 items-center">
          <FaRegCalendarAlt size={35} />
          <p className="text-xl">KALENDÁŘ</p>
        </Card>
      </Link>
      <Link to={"/rutiny"}>
        <Card className="flex flex-row p-3 items-center">
          <LuClipboardList size={35} />
          <p className="text-xl">RUTINY</p>
        </Card>
      </Link>
      <Link to={"/powerlifting"}>
        <Card className="flex flex-row p-3 items-center">
          <Trophy size={35} />
          <p className="text-xl">POWERLIFTING</p>
        </Card>
      </Link>
      <Link to={"/cviky"}>
        <Card className="flex flex-row p-3 items-center">
          <LuDumbbell size={35} />
          <p className="text-xl">CVIKY</p>
        </Card>
      </Link>
      <Link to={"/profil"}>
        <Card className="flex flex-row p-3 items-center">
          <FaUser size={35} />
          <p className="text-xl">PROFIL</p>
        </Card>
      </Link>
    </div>
  );
};

export default Navigation;
