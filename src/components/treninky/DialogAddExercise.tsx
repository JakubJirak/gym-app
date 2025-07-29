import { ExerciseCombobox } from "@/components/treninky/ExerciseCombobox.tsx";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";

type ExerciseSelectWithID = {
  id: string;
  userId: string | null;
  name: string;
};

interface DialogEditSet {
  handleAddExercise: (trainingId: string, order: number) => void;
  exercises: ExerciseSelectWithID[];
  trainingId: string;
  order: number;
  selectedStatuses: ExerciseSelect | null;
  setSelectedStatuses: React.Dispatch<
    React.SetStateAction<ExerciseSelect | null>
  >;
}

type ExerciseSelect = {
  id: string;
  name: string;
};

export function DialogAddExercise({
  handleAddExercise,
  exercises,
  trainingId,
  order,
  selectedStatuses,
  setSelectedStatuses,
}: DialogEditSet) {
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedStatuses) {
      handleAddExercise(trainingId, order);
      setOpen(false);
    }
    setSelectedStatuses(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus className="h-3 w-3" />
            Přidat cvik
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] h-auto">
          <DialogHeader>
            <DialogTitle>Přidání cviku</DialogTitle>
            <DialogDescription>
              Zde můžete přidat nový cvik do tréninku.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <ExerciseCombobox
              selectedStatus={selectedStatuses}
              setSelectedStatus={setSelectedStatuses}
              exerciseId="a"
              exercises={exercises}
            />
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Zrušit</Button>
              </DialogClose>
              <Button type="submit">Uložit změny</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
}
