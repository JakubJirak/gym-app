import type { Exercise } from "@/components/treninky/AddNewTraining.tsx";

interface exerciseDbType {
  id: string;
  workoutId: string;
  exerciseId: number;
  note: string;
}

interface setsDbType {
  id: string;
  workoutExerciseId: string;
  weight: string;
  reps: number;
}

export function exerciseDb(exercise: Exercise[]) {
  const newArr: exerciseDbType[] = [];
  // biome-ignore lint/complexity/noForEach: <explanation>
  exercise.forEach((ex) => {
    if (!ex.exerciseId) ex.exerciseId = 0;
    const newObj: exerciseDbType = {
      id: ex.id,
      workoutId: ex.workoutId,
      exerciseId: ex.exerciseId,
      note: ex.notes,
    };
    newArr.push(newObj);
  });
  return newArr;
}

export function setsDb(exercise: Exercise[]) {
  const setsDb: setsDbType[] = [];
  // biome-ignore lint/complexity/noForEach: <explanation>
  exercise.forEach((ex) => {
    // biome-ignore lint/complexity/noForEach: <explanation>
    ex.sets.forEach((set) => {
      const newSet: setsDbType = {
        id: set.id,
        workoutExerciseId: set.exerciseId,
        weight: set.weight,
        reps: Number(set.reps),
      };
      setsDb.push(newSet);
    });
  });
  return setsDb;
}
