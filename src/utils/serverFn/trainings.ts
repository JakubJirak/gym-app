import type { Training } from "@/components/treninky/AddNewTraining.tsx";
import { db } from "@/db";
import {
  exercises,
  muscleGroups,
  sets,
  workoutExercises,
  workouts,
} from "@/db/schema.ts";
import type {
  exerciseDbType,
  setsDbType,
} from "@/utils/types/trainingsTypes.ts";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

export const fetchTrainings = createServerFn({ method: "GET" })
  .validator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    return db.query.workouts.findMany({
      orderBy: (workout, { desc }) => [desc(workout.workoutDate)],
      where: (workout, { eq }) => eq(workout.userId, data.userId),
      with: {
        workoutExercises: {
          orderBy: (set, { asc }) => [asc(set.order)],
          with: {
            sets: {
              orderBy: (set, { asc }) => [asc(set.order)],
            },
            exercise: {
              with: {
                muscleGroup: true,
              },
            },
          },
        },
      },
    });
  });

export const fetchTrainingsById = createServerFn({ method: "GET" })
  .validator((data: { userId: string; trainingId: string }) => data)
  .handler(async ({ data }) => {
    return db.query.workouts.findMany({
      orderBy: (workout, { desc }) => [desc(workout.workoutDate)],
      where: (workout, { eq, and }) =>
        and(eq(workout.userId, data.userId), eq(workout.id, data.trainingId)),
      with: {
        workoutExercises: {
          orderBy: (set, { asc }) => [asc(set.order)],
          with: {
            sets: {
              orderBy: (set, { asc }) => [asc(set.order)],
            },
            exercise: {
              with: {
                muscleGroup: true,
              },
            },
          },
        },
      },
    });
  });

export const addTraining = createServerFn({ method: "POST" })
  .validator(
    (data: {
      training: Training;
      exercisesDb: exerciseDbType[];
      setsDb: setsDbType[];
      userId: string;
      date: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    await db.transaction(async (trx) => {
      await trx.insert(workouts).values({
        id: data.training.id,
        userId: data.userId,
        name: data.training.name,
        workoutDate: data.date,
      });

      await trx.insert(workoutExercises).values(data.exercisesDb);
      await trx.insert(sets).values(data.setsDb);
    });
  });

export const deleteTraining = createServerFn()
  .validator((data: { trainingId: string }) => data)
  .handler(async ({ data }) => {
    await db.delete(workouts).where(eq(workouts.id, data.trainingId)).execute();
  });

export const deleteExercise = createServerFn()
  .validator((data: { exerciseId: string }) => data)
  .handler(async ({ data }) => {
    await db
      .delete(workoutExercises)
      .where(eq(workoutExercises.id, data.exerciseId))
      .execute();
  });

export const deleteSet = createServerFn()
  .validator((data: { setId: string }) => data)
  .handler(async ({ data }) => {
    await db.delete(sets).where(eq(sets.id, data.setId)).execute();
  });

export const updateSet = createServerFn()
  .validator(
    (data: { setId: string; editSetWeight: string; editSetReps: number }) =>
      data,
  )
  .handler(async ({ data }) => {
    await db
      .update(sets)
      .set({ weight: data.editSetWeight, reps: data.editSetReps })
      .where(eq(sets.id, data.setId))
      .execute();
  });

export const addSet = createServerFn()
  .validator(
    (data: {
      id: string;
      exId: string;
      order: number;
      weight: string;
      reps: number;
    }) => data,
  )
  .handler(async ({ data }) => {
    await db.insert(sets).values({
      id: data.id,
      workoutExerciseId: data.exId,
      weight: data.weight,
      reps: data.reps,
      order: data.order,
    });
  });

export const addExercise = createServerFn()
  .validator(
    (data: {
      id: string;
      workoutId: string;
      exerciseId: string;
      order: number;
    }) => data,
  )
  .handler(async ({ data }) => {
    await db.insert(workoutExercises).values({
      id: data.id,
      workoutId: data.workoutId,
      exerciseId: data.exerciseId,
      order: data.order,
    });
  });

export const addCustomEx = createServerFn({ method: "POST" })
  .validator(
    (data: { userId: string; id: string; name: string; mgId: string }) => data,
  )
  .handler(async ({ data }) => {
    await db.insert(exercises).values({
      id: data.id,
      name: data.name,
      userId: data.userId,
      muscleGroupId: data.mgId,
    });
  });

export const editExercise = createServerFn()
  .validator((data: { exerciseId: string; id: string }) => data)
  .handler(async ({ data }) => {
    await db
      .update(workoutExercises)
      .set({ exerciseId: data.exerciseId })
      .where(eq(workoutExercises.id, data.id));
  });

export const editNote = createServerFn()
  .validator((data: { exId: string; note: string }) => data)
  .handler(async ({ data }) => {
    await db
      .update(workoutExercises)
      .set({ note: data.note })
      .where(eq(workoutExercises.id, data.exId));
  });

export const getExById = createServerFn({ method: "GET" })
  .validator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    return db.select().from(exercises).where(eq(exercises.userId, data.userId));
  });

export const getExWithMuscleGroup = createServerFn({ method: "GET" })
  .validator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    return db
      .select({
        id: exercises.id,
        name: exercises.name,
        muscleGroupName: muscleGroups.muscleGroup,
      })
      .from(exercises)
      .leftJoin(muscleGroups, eq(exercises.muscleGroupId, muscleGroups.id))
      .where(eq(exercises.userId, data.userId))
      .orderBy(muscleGroups.muscleGroup);
  });
