import { DialogAddSet } from "@/components/treninky/DialogAddSet.tsx";
import DialogDeleteExercise from "@/components/treninky/DialogDeleteExercise.tsx";
import { DialogEditExercise } from "@/components/treninky/DialogEditExercise.tsx";
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

type ExerciseSelect = {
  id: string;
  name: string;
};

type ExerciseSelectWithID = {
  id: string;
  userId: string | null;
  name: string;
};

interface TrainingLiProps {
  exercise: {
    id: string;
    note: string | null;
    workoutId: string | null;
    exerciseId: string | null;
    order: number | null;
    exercise: {
      id: string;
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
  addSetWeight: string;
  addSetReps: string;
  setAddSetWeight: React.Dispatch<React.SetStateAction<string>>;
  setAddSetReps: React.Dispatch<React.SetStateAction<string>>;
  handleEditSet: (
    id: string,
    editSetWeight: string,
    editSetReps: string,
  ) => void;
  toggleEdit: boolean;
  handleAddSet: (exId: string, order: number) => void;
  selectedStatusesEx: ExerciseSelect | null;
  setSelectedStatusesEx: React.Dispatch<
    React.SetStateAction<ExerciseSelect | null>
  >;
  exercises: ExerciseSelectWithID[];
  handleEditExercise: (id: string) => void;
}

const TrainingLi = ({
  exercise,
  formatSetInfo,
  handleDeleteExercise,
  handleDeleteSet,
  handleEditSet,
  setAddSetReps,
  setAddSetWeight,
  addSetWeight,
  addSetReps,
  toggleEdit,
  handleAddSet,
  selectedStatusesEx,
  setSelectedStatusesEx,
  exercises,
  handleEditExercise,
}: TrainingLiProps) => {
  return (
    <div key={exercise.id} className="border rounded-lg p-3 space-y-3">
      <div
        className={`${toggleEdit ? "" : "justify-between"} flex items-center`}
      >
        <h4 className="font-semibold text-lg">{exercise?.exercise?.name}</h4>
        <div
          className={`${toggleEdit ? "flex ml-2 mr-auto gap-1.5" : "hidden"}`}
        >
          <DialogAddSet
            setAddSetReps={setAddSetReps}
            setAddSetWeight={setAddSetWeight}
            addSetReps={addSetReps}
            addSetWeight={addSetWeight}
            order={exercise.sets.length}
            handleAddSet={handleAddSet}
            exId={exercise.id}
          />
          <DialogEditExercise
            handleEditExercise={handleEditExercise}
            exercises={exercises}
            exerciseId={exercise.id}
            selectedStatusesEx={selectedStatusesEx}
            setSelectedStatusesEx={setSelectedStatusesEx}
          />

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
