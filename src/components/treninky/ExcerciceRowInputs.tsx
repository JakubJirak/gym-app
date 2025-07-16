import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import type React from "react";
import {FaPlus} from "react-icons/fa6";

interface Set {
  weight: number;
  reps: number;
}

interface TrainingProp {
  name: string;
  sets: Set[];
}

interface ExcerciceProps {
  vaha: string;
  opak: string;
  trainings: TrainingProp[];
  index: number;
  setVaha: React.Dispatch<React.SetStateAction<string>>;
  setOpak: React.Dispatch<React.SetStateAction<string>>;
  setTrainings: React.Dispatch<React.SetStateAction<TrainingProp[]>>;
  setShowInputs: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExcerciceRowInputs = ({
  vaha,
  opak,
  trainings,
  index,
  setVaha,
  setOpak,
  setTrainings,
  setShowInputs,
}: ExcerciceProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowInputs(false);

    const set: Set = {
      weight: Number(vaha),
      reps: Number(opak),
    };

    const setsBefore = trainings.filter((_, i) => i < index);
    const setsAfter = trainings.filter((_, i) => i > index);
    const setArray = trainings[index].sets;
    trainings[index].sets = [...setArray, set];

    setTrainings([...setsBefore, trainings[index], ...setsAfter]);
    setVaha("");
    setOpak("");
  };

  return (
    <div className="grid grid-cols-[15px_1fr_120px]  justify-items-start gap-1">
      <p />
      <p />
      <div className="grid grid-cols-[1fr_1fr_12px] items-center gap-1">
        <div className="grid gap-2 justify-items-center">
          <Label htmlFor="vaha" className="text-muted-foreground">
            VÁHA
          </Label>
          <Input
            value={vaha}
            onChange={(e) => setVaha(e.target.value)}
            type="number"
            step="0.01"
            id="vaha"
            name="vaha"
            min={1}
          />
        </div>
        <div className="grid gap-2 justify-items-center">
          <Label htmlFor="opak" className="text-muted-foreground">
            OPAK.
          </Label>
          <Input
            value={opak}
            onChange={(e) => setOpak(e.target.value)}
            type="number"
            step="0.01"
            id="opak"
            name="opak"
            min={1}
          />
        </div>
        <Button onClick={handleSubmit} size="icon-xs">
          <FaPlus />
        </Button>
      </div>
    </div>
  );
};

export default ExcerciceRowInputs;
