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
import { addExercise } from "@/utils/serverFn/trainings";
import type {
  ExerciseSelect,
  ExerciseSelectWithID,
} from "@/utils/types/trainingsTypes.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface DialogEditSet {
  exercises: ExerciseSelectWithID[];
  trainingId: string;
  order: number;
}

export function DialogAddExercise({
  exercises,
  trainingId,
  order,
}: DialogEditSet) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedStatuses, setSelectedStatuses] =
    useState<ExerciseSelect | null>(null);
  const queryClient = useQueryClient();

  const addExerciseMutation = useMutation({
    mutationFn: addExercise,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
    onError: (error) => console.log(error),
  });

  function handleAddExercise(trainingId: string, order: number) {
    addExerciseMutation.mutate({
      data: {
        id: uuidv4(),
        workoutId: trainingId,
        exerciseId: selectedStatuses?.id ?? "dl",
        order: order,
      },
    });
  }

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
