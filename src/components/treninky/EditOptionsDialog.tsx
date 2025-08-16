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
import type { ExerciseSelectWithID } from "@/utils/types/trainingsTypes.ts";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface EditOptionsDialogProps {
  order: number;
  exId: string;
  exercises: ExerciseSelectWithID[];
  exerciseId: string;
  id: string;
}

export function EditOptionsDialog({
  order,
  exId,
  exercises,
  exerciseId,
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
                exId={exId}
                setOpenParent={setOpenParent}
              />

              <DialogEditExercise
                exercises={exercises}
                exerciseId={exerciseId}
                setOpenParent={setOpenParent}
              />

              <DialogEditNote
                setOpenParent={setOpenParent}
                exerciseId={exerciseId}
              />

              <DialogDeleteExercise id={id} setOpenParent={setOpenParent} />
            </div>
          </DialogHeader>
        </DialogContent>
      </form>
    </Dialog>
  );
}
