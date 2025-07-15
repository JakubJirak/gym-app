import { Card } from "../ui/card";

interface ExcerciceProps {
  number: number;
  title: string;
  weight: number;
  reps: number;
}

const Excercice = ({ number, title, weight, reps }: ExcerciceProps) => {
  return (
    <Card className="bg-secondary grid grid-cols-[15px_1fr_60px_35px_10px] justify-items-start p-4 gap-1">
      <p>{number}.</p>
      <p className="ml-1 font-semibold">{title}</p>
      <p>{weight}kg</p>
      <p>{reps}x</p>
      <p>+</p>
    </Card>
  );
};

export default Excercice;
