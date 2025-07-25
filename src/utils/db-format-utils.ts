import type { Exercise } from "@/components/treninky/AddNewTraining.tsx";

interface exerciseDbType {
  id: string;
  workoutId: string;
  exerciseId: string;
  note: string;
  order: number;
}

interface setsDbType {
  id: string;
  workoutExerciseId: string;
  weight: string;
  reps: number;
  order: number;
}

export function exerciseDb(exercise: Exercise[]) {
  const newArr: exerciseDbType[] = [];
  exercise.forEach((ex, i) => {
    if (!ex.exerciseId) ex.exerciseId = "";
    const newObj: exerciseDbType = {
      id: ex.id,
      workoutId: ex.workoutId,
      exerciseId: ex.exerciseId,
      note: ex.notes,
      order: i,
    };
    newArr.push(newObj);
  });
  return newArr;
}

export function setsDb(exercise: Exercise[]) {
  const setsDb: setsDbType[] = [];
  // biome-ignore lint/complexity/noForEach: <explanation>
  exercise.forEach((ex) => {
    ex.sets.forEach((set, i) => {
      const newSet: setsDbType = {
        id: set.id,
        workoutExerciseId: set.exerciseId,
        weight: set.weight,
        reps: Number(set.reps),
        order: i,
      };
      setsDb.push(newSet);
    });
  });
  return setsDb;
}
