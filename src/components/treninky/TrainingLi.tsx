import { EditOptionsDialog } from "@/components/treninky/EditOptionsDialog.tsx";
import { DialogEditSet } from "@/components/treninky/editDialogs/DialogEditSet.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import type {
  ExerciseSelect,
  ExerciseSelectWithID,
  SetType,
} from "@/utils/types/trainingsTypes.ts";
import type React from "react";

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
      muscleGroup: {
        muscleGroup: string;
      } | null;
    } | null;
    sets: {
      id: string;
      order: number | null;
      workoutExerciseId: string | null;
      weight: string | null;
      reps: number | null;
    }[];
  };
  formatSetInfo: (set: SetType) => string;
  handleDeleteSet: (id: string) => void;
  handleDeleteExercise: (id: string) => void;
  handleEditSet: (
    id: string,
    editSetWeight: string,
    editSetReps: string,
  ) => void;
  toggleEdit: boolean;
  handleAddSet: (
    exId: string,
    order: number,
    addSetWeight: string,
    addSetReps: string,
  ) => void;
  selectedStatusesEx: ExerciseSelect | null;
  setSelectedStatusesEx: React.Dispatch<
    React.SetStateAction<ExerciseSelect | null>
  >;
  exercises: ExerciseSelectWithID[];
  handleEditExercise: (id: string) => void;
  handleEditNote: (id: string, note: string) => void;
}

const TrainingLi = ({
  exercise,
  formatSetInfo,
  handleDeleteExercise,
  handleDeleteSet,
  handleEditSet,
  toggleEdit,
  handleAddSet,
  selectedStatusesEx,
  setSelectedStatusesEx,
  exercises,
  handleEditExercise,
  handleEditNote,
}: TrainingLiProps) => {
  return (
    <div key={exercise.id} className="border rounded-lg p-3 space-y-3">
      <div
        className={`${toggleEdit ? "" : "justify-between"} flex items-center`}
      >
        <h4 className="font-semibold text-lg">{exercise?.exercise?.name} </h4>
        <div
          className={`${toggleEdit ? "flex ml-2 mr-auto gap-1.5" : "hidden"}`}
        >
          <EditOptionsDialog
            order={exercise.sets.length}
            handleAddSet={handleAddSet}
            exId={exercise.id}
            handleEditExercise={handleEditExercise}
            exercises={exercises}
            exerciseId={exercise.id}
            selectedStatusesEx={selectedStatusesEx}
            setSelectedStatusesEx={setSelectedStatusesEx}
            handleDeleteExercise={handleDeleteExercise}
            id={exercise.id}
            handleEditNote={handleEditNote}
          />
        </div>
        <Badge variant="outline">
          {exercise?.exercise?.muscleGroup?.muscleGroup}
        </Badge>
      </div>

      <div>
        <div className="grid gap-2">
          {exercise.sets.map((set, setIndex) => (
            <div
              key={set.id}
              className="flex items-center bg-secondary rounded-md py-2 px-3"
            >
              <span className="text-sm flex-1">{setIndex + 1}. série</span>
              <span className="text-sm font-medium mr-2">
                {formatSetInfo(set)}
              </span>
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
        <p className="text-sm text-muted-foreground">{exercise.note}</p>
      )}
    </div>
  );
};

export default TrainingLi;
