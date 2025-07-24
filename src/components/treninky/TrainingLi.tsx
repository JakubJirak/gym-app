import DialogDeleteExercise from "@/components/treninky/DialogDeleteExercise.tsx";
import { DialogEditSet } from "@/components/treninky/DialogEditSet.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import type React from "react";

interface Set {
  id: string;
  reps: number | null;
  weight: string | null;
  workoutExerciseId: string | null;
}

interface TrainingLiProps {
  exercise: {
    id: string;
    note: string | null;
    workoutId: string | null;
    exerciseId: number | null;
    order: number | null;
    exercise: {
      id: number;
      name: string;
    } | null;
    sets: {
      id: string;
      order: number | null;
      workoutExerciseId: string | null;
      weight: string | null;
      reps: number | null;
    }[];
  };
  formatSetInfo: (set: Set) => string;
  handleDeleteSet: (id: string) => void;
  handleDeleteExercise: (id: string) => void;
  editSetWeight: string;
  editSetReps: string;
  setEditSetWeight: React.Dispatch<React.SetStateAction<string>>;
  setEditSetReps: React.Dispatch<React.SetStateAction<string>>;
  handleEditSet: (id: string) => void;
  toggleEdit: boolean;
}

const TrainingLi = ({
  exercise,
  formatSetInfo,
  handleDeleteExercise,
  handleDeleteSet,
  handleEditSet,
  setEditSetReps,
  setEditSetWeight,
  editSetWeight,
  editSetReps,
  toggleEdit,
}: TrainingLiProps) => {
  return (
    <div key={exercise.id} className="border rounded-lg p-3 space-y-3">
      <div
        className={`${toggleEdit ? "" : "justify-between"} flex items-center`}
      >
        <h4 className="font-semibold text-lg">{exercise?.exercise?.name}</h4>
        <div className={`${toggleEdit ? "block mr-auto" : "hidden"}`}>
          <DialogDeleteExercise
            handleDeleteExercise={handleDeleteExercise}
            id={exercise.id}
          />
        </div>
        <Badge variant="outline">Série: {exercise.sets.length}</Badge>
      </div>

      <div>
        <div className="grid gap-2">
          {exercise.sets.map((set, setIndex) => (
            <div
              key={set.id}
              className="flex items-center bg-secondary rounded-md py-2 px-3"
            >
              <span className="text-sm font-medium flex-1">
                {setIndex + 1}. série
              </span>
              <span className="text-sm mr-2">{formatSetInfo(set)}</span>
              <div className={`${toggleEdit ? "block" : "hidden"}`}>
                <DialogEditSet
                  repsBefore={set.reps}
                  weightBefore={set.weight}
                  setId={set.id}
                  handleDeleteSet={handleDeleteSet}
                  editSetReps={editSetReps}
                  editSetWeight={editSetWeight}
                  setEditSetReps={setEditSetReps}
                  setEditSetWeight={setEditSetWeight}
                  handleEditSet={handleEditSet}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {exercise.note && <Separator />}

      {exercise.note && (
        <div className="bg-secondary rounded-md p-2 px-3">
          <p className="text-base text-muted-foreground">{exercise.note}</p>
        </div>
      )}
    </div>
  );
};

export default TrainingLi;
