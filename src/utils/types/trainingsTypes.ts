import type { fetchTrainings } from "@/utils/serverFn/trainings.ts";

export interface exerciseDbType {
  id: string;
  workoutId: string;
  exerciseId: string;
  note: string;
  order: number;
}

export interface setsDbType {
  id: string;
  workoutExerciseId: string;
  weight: string;
  reps: number;
  order: number;
}

export type ExerciseSelectWithID = {
  id: string;
  userId: string | null;
  name: string;
};

export type ExerciseSelect = {
  id: string;
  name: string;
};

export type SetType = {
  id: string;
  reps: number | null;
  weight: string | null;
  workoutExerciseId: string | null;
};

export type Exercise = {
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

export type TrainingsType = Awaited<ReturnType<typeof fetchTrainings>>;
