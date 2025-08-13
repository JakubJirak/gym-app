import { Card } from "@/components/ui/card.tsx";
import { Link } from "@tanstack/react-router";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { GiWeightLiftingUp } from "react-icons/gi";
import { IoIosStats } from "react-icons/io";
import { LuClipboardList, LuDumbbell } from "react-icons/lu";

const Navigation = () => {
  return (
    <div className="flex max-w-[500px] w-[90%] mx-auto gap-4 mt-3 flex-col pb-8">
      <Link to={"/treninky"}>
        <Card className="flex flex-row p-4 items-center">
          <GiWeightLiftingUp size={40} />
          <p className="text-2xl">TRÉNINKY</p>
        </Card>
      </Link>
      <Link to={"/statistiky"}>
        <Card className="flex flex-row p-4 items-center">
          <IoIosStats size={40} />
          <p className="text-2xl">STATISTIKY</p>
        </Card>
      </Link>
      <Link to={"/kalendar"}>
        <Card className="flex flex-row p-4 items-center">
          <FaRegCalendarAlt size={40} />
          <p className="text-2xl">KALENDÁŘ</p>
        </Card>
      </Link>
      <Link to={"/rutiny"}>
        <Card className="flex flex-row p-4 items-center">
          <LuClipboardList size={40} />
          <p className="text-2xl">RUTINY</p>
        </Card>
      </Link>
      <Link to={"/cviky"}>
        <Card className="flex flex-row p-4 items-center">
          <LuDumbbell size={40} />
          <p className="text-2xl">CVIKY</p>
        </Card>
      </Link>
      <Link to={"/profil"}>
        <Card className="flex flex-row p-4 items-center">
          <FaUser size={40} />
          <p className="text-2xl">PROFIL</p>
        </Card>
      </Link>
    </div>
  );
};

export default Navigation;
