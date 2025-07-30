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
import { Pencil } from "lucide-react";
import type React from "react";
import { useState } from "react";

type ExerciseSelectWithID = {
  id: string;
  userId: string | null;
  name: string;
};

interface DialogEditSet {
  handleEditExercise: (id: string) => void;
  exercises: ExerciseSelectWithID[];
  exerciseId: string;
  selectedStatusesEx: ExerciseSelect | null;
  setSelectedStatusesEx: React.Dispatch<
    React.SetStateAction<ExerciseSelect | null>
  >;
}

type ExerciseSelect = {
  id: string;
  name: string;
};

export function DialogEditExercise({
  handleEditExercise,
  exercises,
  exerciseId,
  selectedStatusesEx,
  setSelectedStatusesEx,
}: DialogEditSet) {
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedStatusesEx) {
      handleEditExercise(exerciseId);
      setOpen(false);
    }
    setSelectedStatusesEx(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon-xs">
            <Pencil className="size-3" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] h-auto">
          <DialogHeader>
            <DialogTitle>Změna cviku</DialogTitle>
            <DialogDescription>
              Zde můžete změnit typ cviku v tréninku.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <ExerciseCombobox
              selectedStatus={selectedStatusesEx}
              setSelectedStatus={setSelectedStatusesEx}
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
