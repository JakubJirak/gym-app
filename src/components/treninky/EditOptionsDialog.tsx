import { DialogAddSet } from "@/components/treninky/editDialogs/DialogAddSet.tsx";
import DialogDeleteExercise from "@/components/treninky/editDialogs/DialogDeleteExercise.tsx";
import { DialogEditExercise } from "@/components/treninky/editDialogs/DialogEditExercise.tsx";
import { DialogEditNote } from "@/components/treninky/editDialogs/DialogEditNote.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import type {
  ExerciseSelect,
  ExerciseSelectWithID,
} from "@/utils/types/trainingsTypes.ts";
import { Pencil } from "lucide-react";
import { useState } from "react";
import type React from "react";

interface EditOptionsDialogProps {
  order: number;
  handleAddSet: (
    exId: string,
    order: number,
    addSetWeight: string,
    addSetReps: string,
  ) => void;
  exId: string;
  handleEditExercise: (id: string) => void;
  exercises: ExerciseSelectWithID[];
  exerciseId: string;
  selectedStatusesEx: ExerciseSelect | null;
  setSelectedStatusesEx: React.Dispatch<
    React.SetStateAction<ExerciseSelect | null>
  >;
  handleDeleteExercise: (id: string) => void;
  id: string;
  handleEditNote: (id: string, note: string) => void;
}

export function EditOptionsDialog({
  order,
  handleAddSet,
  exId,
  handleEditExercise,
  exercises,
  exerciseId,
  selectedStatusesEx,
  setSelectedStatusesEx,
  handleDeleteExercise,
  handleEditNote,
  id,
}: EditOptionsDialogProps) {
  const [openParent, setOpenParent] = useState(false);
  return (
    <Dialog open={openParent} onOpenChange={setOpenParent}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon-xs">
            <Pencil className="size-3" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] h-auto">
          <DialogHeader>
            <DialogTitle>Změna ve cviku</DialogTitle>
            <DialogDescription>
              Zde můžete změnit vše v daném cviku.
            </DialogDescription>

            <div className="flex w-full flex-col items-center gap-2 mt-4">
              <DialogAddSet
                order={order}
                handleAddSet={handleAddSet}
                exId={exId}
                setOpenParent={setOpenParent}
              />

              <DialogEditExercise
                handleEditExercise={handleEditExercise}
                exercises={exercises}
                exerciseId={exerciseId}
                selectedStatusesEx={selectedStatusesEx}
                setSelectedStatusesEx={setSelectedStatusesEx}
                setOpenParent={setOpenParent}
              />

              <DialogEditNote
                setOpenParent={setOpenParent}
                exerciseId={exerciseId}
                handleEditNote={handleEditNote}
              />

              <DialogDeleteExercise
                handleDeleteExercise={handleDeleteExercise}
                id={id}
                setOpenParent={setOpenParent}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </form>
    </Dialog>
  );
}
