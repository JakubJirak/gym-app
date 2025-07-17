import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useTrainingContext } from "@/data/providers/training-provider.tsx";
import type React from "react";
import { MdDone } from "react-icons/md";

interface ExcerciceProps {
  vaha: string;
  opak: string;
  number: number;
  setVaha: React.Dispatch<React.SetStateAction<string>>;
  setOpak: React.Dispatch<React.SetStateAction<string>>;
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExcerciceInputs = ({
  vaha,
  opak,
  number,
  setVaha,
  setOpak,
  setAdd,
}: ExcerciceProps) => {
  const { exercices, cvik, setExercices, setCvik } = useTrainingContext();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTraining = {
      name: cvik,
      sets: [
        {
          weight: Number(vaha),
          reps: Number(opak),
        },
      ],
    };

    setExercices([...exercices, newTraining]);

    setAdd(false);
    setCvik("");
    setVaha("");
    setOpak("");
  };

  return (
    <Card className=" grid grid-cols-[15px_1fr] items-center justify-items-start px-4 py-3 gap-4">
      <p>{number}.</p>
      <div className="grid grid-cols-[2fr_1fr_1fr_12px] gap-3 items-center">
        <div className="grid gap-2 justify-items-center">
          <Label htmlFor="cvik" className="text-muted-foreground">
            CVIK
          </Label>
          <Input
            value={cvik}
            onChange={(e) => setCvik(e.target.value)}
            type="text"
            id="cvik"
            name="cvik"
          />
        </div>
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
          <MdDone />
        </Button>
      </div>
    </Card>
  );
};

export default ExcerciceInputs;
