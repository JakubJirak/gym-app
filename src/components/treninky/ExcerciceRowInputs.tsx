import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useTrainingContext } from "@/data/providers/training-provider.tsx";
import type React from "react";
import { FaPlus } from "react-icons/fa6";

interface Set {
  weight: number;
  reps: number;
}

interface ExcerciceProps {
  vaha: string;
  opak: string;
  index: number;
  setVaha: React.Dispatch<React.SetStateAction<string>>;
  setOpak: React.Dispatch<React.SetStateAction<string>>;
  setShowInputs: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExcerciceRowInputs = ({
  vaha,
  opak,
  index,
  setVaha,
  setOpak,
  setShowInputs,
}: ExcerciceProps) => {
  const { exercices, setExercices } = useTrainingContext();

  const addSet = () => {
    if (vaha !== "" && opak !== "") {
      if (Number(vaha) > 0 && Number(opak) > 0) {
        const set: Set = {
          weight: Number(vaha),
          reps: Number(opak),
        };

        const setsBefore = exercices.filter((_, i) => i < index);
        const setsAfter = exercices.filter((_, i) => i > index);
        const setArray = exercices[index].sets;
        exercices[index].sets = [...setArray, set];

        setExercices([...setsBefore, exercices[index], ...setsAfter]);
        setVaha("");
        setOpak("");
        setShowInputs(false);
      }
    }
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
        <Button onClick={addSet} type="button" size="icon-xs">
          <FaPlus />
        </Button>
      </div>
    </div>
  );
};

export default ExcerciceRowInputs;
