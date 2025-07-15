import {Card} from "../ui/card";
import {FaPlus} from "react-icons/fa6";
import {Button} from "@/components/ui/button.tsx";

interface ExcerciceProps {
  number: number;
  title: string;
  weight: number;
  reps: number;
}

const Excercice = ({ number, title, weight, reps }: ExcerciceProps) => {
  return (
    <Card className="bg-secondary grid grid-cols-[15px_1fr_60px_32px_12px] items-center justify-items-start px-4 py-3 gap-1">
      <p>{number}.</p>
      <p className="ml-1 font-semibold">{title}</p>
      <p>{weight}kg</p>
      <p>{reps}x</p>
      <Button size="icon-xs">
        <FaPlus />
      </Button>
    </Card>
  );
};

export default Excercice;
