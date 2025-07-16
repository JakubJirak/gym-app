import {Button} from "@/components/ui/button.tsx";
import type React from "react";
import {FaPlus} from "react-icons/fa6";

interface ExcerciceRow {
  number: number;
  title: string;
  weight: number;
  reps: number;
  showPlus: boolean;
  setShowInputs: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExcerciceRow = ({
  number,
  title,
  weight,
  reps,
  showPlus,
  setShowInputs,
}: ExcerciceRow) => {
  return (
    <div className="grid grid-cols-[15px_1fr_60px_32px_12px] justify-items-start items-center gap-1">
      <p>{number !== 0 && `${number}.`}</p>
      <p>{title}</p>
      <p>{weight}kg</p>
      <p>{reps}x</p>
      {showPlus ? (
        <Button onClick={() => setShowInputs(true)} size="icon-xs">
          <FaPlus />
        </Button>
      ) : (
        <p />
      )}
    </div>
  );
};

export default ExcerciceRow;
