import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { Calendar, Dumbbell } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";

import DialogDeleteExercise from "@/components/treninky/DialogDeleteExercise.tsx";
import DialogDelete from "@/components/treninky/DialogDeleteTraining.tsx";
import { DialogEditSet } from "@/components/treninky/DialogEditSet.tsx";
import { db } from "@/db";
import { sets, workoutExercises, workouts } from "@/db/schema.ts";
import { toLocalISODateString } from "@/utils/date-utils.ts";
import { exerciseDb, setsDb } from "@/utils/db-format-utils.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { useState } from "react";
import { GiWeightLiftingUp } from "react-icons/gi";
import TrainingDialog, { type Training } from "./AddNewTraining.tsx";

export interface Set {
  id: string;
  reps: number | null;
  weight: string | null;
  workoutExerciseId: string | null;
}

interface TrainingsListProp {
  userId: string;
}

interface exerciseDbType {
  id: string;
  workoutId: string;
  exerciseId: number;
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

const addTraining = createServerFn({ method: "POST" })
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

const fetchTrainings = createServerFn({ method: "GET" })
  .validator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    const trainings = await db.query.workouts.findMany({
      orderBy: (workout, { desc }) => [desc(workout.workoutDate)],
      where: (workout, { eq }) => eq(workout.userId, data.userId),
      with: {
        workoutExercises: {
          orderBy: (set, { asc }) => [asc(set.order)],
          with: {
            sets: {
              orderBy: (set, { asc }) => [asc(set.order)],
            },
            exercise: true,
          },
        },
      },
    });
    return trainings;
  });

const deleteTraining = createServerFn()
  .validator((data: { trainingId: string }) => data)
  .handler(async ({ data }) => {
    await db.delete(workouts).where(eq(workouts.id, data.trainingId)).execute();
  });

const deleteExercise = createServerFn()
  .validator((data: { exerciseId: string }) => data)
  .handler(async ({ data }) => {
    await db
      .delete(workoutExercises)
      .where(eq(workoutExercises.id, data.exerciseId))
      .execute();
  });

const deleteSet = createServerFn()
  .validator((data: { setId: string }) => data)
  .handler(async ({ data }) => {
    await db.delete(sets).where(eq(sets.id, data.setId)).execute();
  });

const updateSet = createServerFn()
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

const TrainingsList = ({ userId }: TrainingsListProp) => {
  const [editSetWeight, setEditSetWeight] = useState<string>("");
  const [editSetReps, setEditSetReps] = useState<string>("");

  const mutationTrainings = useMutation({
    mutationFn: addTraining,
    onSuccess: () => {
      refetch();
    },
    onError: (error: Error) => console.error(error),
  });

  const { data: trainings, refetch } = useQuery({
    queryKey: ["workouts", userId],
    queryFn: () => fetchTrainings({ data: { userId } }),
    enabled: true,
  });

  const handleSaveTraining = async (training: Training) => {
    handleAddTraining(training);
  };

  function formatDate(date: Date | null, formatString: string) {
    if (date) {
      return format(date, formatString, { locale: cs });
    }
    return "neplatne datum";
  }

  function handleAddTraining(training: Training) {
    const ISOdate = toLocalISODateString(training.date);
    const exercises = exerciseDb(training.exercises);
    const sets = setsDb(training.exercises);

    mutationTrainings.mutate({
      data: {
        training: training,
        exercisesDb: exercises,
        setsDb: sets,
        userId: userId,
        date: ISOdate,
      },
    });
  }

  const deleteMutationTraining = useMutation({
    mutationFn: deleteTraining,
    onSuccess: () => {
      refetch();
    },
    onError: (error) => console.log(error),
  });

  const deleteMutationExercise = useMutation({
    mutationFn: deleteExercise,
    onSuccess: () => {
      refetch();
    },
    onError: (error) => console.log(error),
  });

  const deleteMutationSet = useMutation({
    mutationFn: deleteSet,
    onSuccess: () => {
      refetch();
    },
    onError: (error) => console.log(error),
  });

  const updateMutationSet = useMutation({
    mutationFn: updateSet,
    onSuccess: () => {
      refetch();
    },
    onError: (error) => console.log(error),
  });

  function handleDeleteTraining(id: string) {
    deleteMutationTraining.mutate({
      data: { trainingId: id },
    });
  }

  function handleDeleteExericse(id: string) {
    deleteMutationExercise.mutate({
      data: { exerciseId: id },
    });
  }

  function handleDeleteSet(id: string) {
    deleteMutationSet.mutate({
      data: { setId: id },
    });
  }

  function handleEditSet(id: string) {
    updateMutationSet.mutate({
      data: {
        setId: id,
        editSetWeight: editSetWeight,
        editSetReps: Number(editSetReps),
      },
    });
  }

  const formatSetInfo = (set: Set) => {
    const parts = [];
    if (set.weight) parts.push(`${set.weight}kg`);
    if (set.reps) parts.push(`${set.reps}`);
    return parts.join(" × ") || "Prázdná série";
  };

  if (trainings === undefined)
    return (
      <Card className="max-w-[500px] mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-6">
          <GiWeightLiftingUp size={55} />
          <h3 className="text-lg font-semibold my-3">Zatím žádné tréninky</h3>
          <p className="text-muted-foreground text-center mb-5">
            Začněte sledovat své tréninky přidáním prvního tréninku.
          </p>
          <TrainingDialog onSave={handleSaveTraining} />
        </CardContent>
      </Card>
    );

  return (
    <div className="container mx-auto p-4 max-w-[500px]">
      <div className="space-y-4">
        {/* Trainings List */}
        {trainings.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-end mt-[-20px]">
              <TrainingDialog onSave={handleSaveTraining} />
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5" />
                  Seznam tréninků
                </CardTitle>
                <CardDescription>
                  Celkem {trainings.length} tréninků
                </CardDescription>
              </CardHeader>
            </Card>
            <Accordion type="multiple" className="w-full space-y-2">
              {trainings.map((training) => (
                <AccordionItem
                  key={training.id}
                  value={training.id}
                  className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-xl border px-4 outline-none last:border-b has-focus-visible:ring-[3px]"
                >
                  <AccordionTrigger className="hover:no-underline flex items-center">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <div className="text-left">
                          <div className="font-semibold">{training.name}</div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {formatDate(new Date(training.workoutDate), "PPPP")}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        Cviky: {training.workoutExercises.length}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-4 items-stretch pt-4 relative">
                      {training.workoutExercises.map((exercise) => (
                        <div
                          key={exercise.id}
                          className="border rounded-lg p-4 space-y-3"
                        >
                          <div className="flex items-center">
                            <h4 className="font-semibold text-lg">
                              {exercise?.exercise?.name}
                            </h4>
                            <DialogDeleteExercise
                              handleDeleteExercise={handleDeleteExericse}
                              id={exercise.id}
                            />
                            <Badge variant="outline">
                              Série: {exercise.sets.length}
                            </Badge>
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
                                  <span className="text-sm mr-2">
                                    {formatSetInfo(set)}
                                  </span>
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
                              ))}
                            </div>
                          </div>

                          {exercise.note && <Separator />}

                          {exercise.note && (
                            <div className="bg-secondary rounded-md p-3">
                              <p className="text-base text-muted-foreground">
                                {exercise.note}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                      <div className="inline-flex self-end">
                        <DialogDelete
                          handleDeleteTraining={handleDeleteTraining}
                          id={training.id}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ) : (
          <Card className="max-w-[500px] mx-auto">
            <CardContent className="flex flex-col items-center justify-center py-6">
              <GiWeightLiftingUp size={55} />
              <h3 className="text-lg font-semibold my-3">
                Zatím žádné tréninky
              </h3>
              <p className="text-muted-foreground text-center mb-5">
                Začněte sledovat své tréninky přidáním prvního tréninku.
              </p>
              <TrainingDialog onSave={handleSaveTraining} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrainingsList;
