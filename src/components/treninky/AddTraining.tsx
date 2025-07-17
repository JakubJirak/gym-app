import ExcerciceInputs from "@/components/treninky/ExcerciceInputs.tsx";
import { Card } from "@/components/ui/card.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTrainingContext } from "@/data/providers/training-provider.tsx";
import type React from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineModeEdit } from "react-icons/md";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Excercice from "./Excercice";

interface Set {
  weight: number;
  reps: number;
}

interface ExcercisesProp {
  name: string;
  sets: Set[];
}

type TrainingObj = {
  name: string;
  date: string;
  excercises: ExcercisesProp[];
};

const AddTraining = () => {
  const { trainings, exercices, setTrainings } = useTrainingContext();
  const [vaha, setVaha] = useState<string>("");
  const [opak, setOpak] = useState<string>("");
  const [add, setAdd] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    if (exercices.length > 0) {
      e.preventDefault();
      const newTraining: TrainingObj = {
        name: name,
        date: date,
        excercises: exercices,
      };
      console.log(newTraining);

      setTrainings([newTraining, ...(trainings ?? [])]);
    }
  };

  return (
    <div className="max-w-[500px] flex flex-col mx-auto">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-auto ml-auto mr-6">Přidat trénink</Button>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined} className="p-5">
          <DialogHeader>
            <form onSubmit={handleSubmit} className="flex h-full flex-col">
              <DialogTitle className="text-xl mb-4">
                Přidání tréninku
              </DialogTitle>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Název tréninku</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="name-1"
                    name="training"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1">Datum</Label>
                  <Input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="text"
                    id="username-1"
                    name="date"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mb-3">
                <DialogTitle className="text-xl text-left">Cviky</DialogTitle>
                <Button size="icon-sm">
                  <MdOutlineModeEdit />
                </Button>
              </div>
              <div className="flex flex-col gap-3">
                {exercices.map((training, index) => (
                  <Excercice
                    index={index}
                    number={index + 1}
                    title={training.name}
                    sets={training.sets}
                    key={training.name}
                  />
                ))}
                {add && (
                  <ExcerciceInputs
                    vaha={vaha}
                    opak={opak}
                    number={exercices.length + 1}
                    setVaha={setVaha}
                    setOpak={setOpak}
                    setAdd={setAdd}
                  />
                )}
                {!add && (
                  <Card className="h-10 flex items-center justify-center">
                    <Button
                      onClick={() => setAdd(true)}
                      size="icon-lg"
                      variant="muted"
                    >
                      <FaPlus size={50} />
                    </Button>
                  </Card>
                )}
              </div>
              <button className="flex mt-auto" type="submit">
                pridat
              </button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddTraining;
