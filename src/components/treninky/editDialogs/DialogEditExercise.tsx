import { ExerciseCombobox } from "@/components/treninky/ExerciseCombobox.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import type {
  ExerciseSelect,
  ExerciseSelectWithID,
} from "@/utils/types/trainingsTypes.ts";
import { Pencil } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface DialogEditSet {
  handleEditExercise: (id: string) => void;
  exercises: ExerciseSelectWithID[];
  exerciseId: string;
  selectedStatusesEx: ExerciseSelect | null;
  setSelectedStatusesEx: React.Dispatch<
    React.SetStateAction<ExerciseSelect | null>
  >;
  setOpenParent: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DialogEditExercise({
  handleEditExercise,
  exercises,
  exerciseId,
  selectedStatusesEx,
  setSelectedStatusesEx,
  setOpenParent,
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
    setOpenParent(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-40">
            <Pencil className="size-4" />
            Změnit cvik
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
