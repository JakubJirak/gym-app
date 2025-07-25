import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { Calendar, Dumbbell } from "lucide-react";

import DialogDelete from "@/components/treninky/DialogDeleteTraining.tsx";
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
import { Toggle } from "@/components/ui/toggle.tsx";
import { db } from "@/db";
import { sets, workoutExercises, workouts } from "@/db/schema.ts";
import { toLocalISODateString } from "@/utils/date-utils.ts";
import { exerciseDb, setsDb } from "@/utils/db-format-utils.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import TrainingDialog, { type Training } from "./AddNewTraining.tsx";
import TrainingLi from "./TrainingLi.tsx";

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
    return await db.query.workouts.findMany({
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
  const [toggleEdit, setToggleEdit] = useState(false);

  const mutationTrainings = useMutation({
    mutationFn: addTraining,
    onSuccess: () => {
      refetch();
    },
    onError: (error: Error) => console.error(error),
  });

  const {
    data: trainings,
    refetch,
    isLoading,
  } = useQuery({
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

  if (isLoading) return <p>Načítání dat</p>;

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
    <div className="container mx-auto w-[90%] mt-12 max-w-[500px]">
      <div className="space-y-4">
        {/* Trainings List */}
        {trainings.length > 0 ? (
          <div className="space-y-3 mt-[-24px]">
            <Card className="py-4">
              <CardHeader className="px-4">
                <div className="flex flex-row gap-1 items-center mb-[-8px]">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <Dumbbell className="h-5 w-5" />
                      Vaše tréninky
                    </CardTitle>
                    <CardDescription>
                      Celkem tréninků: {trainings.length}
                    </CardDescription>
                  </div>
                  <div className="">
                    <TrainingDialog onSave={handleSaveTraining} />
                  </div>
                </div>
              </CardHeader>
            </Card>
            <Accordion type="multiple" className="w-full space-y-2">
              {trainings.map((training) => (
                <AccordionItem
                  key={training.id}
                  value={training.id}
                  className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-xl border px-4 outline-none last:border-b has-focus-visible:ring-[3px]"
                >
                  <AccordionTrigger className="hover:no-underline flex items-center py-3 gap-2">
                    <div className="w-full grid grid-cols-[5fr_2fr] items-center grid-rows-2">
                      <div className="font-semibold">{training.name}</div>
                      <Badge variant="secondary">
                        Cviky: {training.workoutExercises.length}
                      </Badge>
                      <div className="flex col-span-2 items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {formatDate(new Date(training.workoutDate), "PPPP")}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <div className="flex flex-col gap-2 items-stretch relative">
                      {training.workoutExercises.map((exercise) => (
                        <TrainingLi
                          key={exercise.id}
                          exercise={exercise}
                          formatSetInfo={formatSetInfo}
                          editSetWeight={editSetWeight}
                          editSetReps={editSetReps}
                          setEditSetWeight={setEditSetWeight}
                          setEditSetReps={setEditSetReps}
                          handleDeleteSet={handleDeleteSet}
                          handleDeleteExercise={handleDeleteExericse}
                          handleEditSet={handleEditSet}
                          toggleEdit={toggleEdit}
                        />
                      ))}
                      <div className="flex justify-between items-center">
                        <div className="">
                          <Toggle
                            variant="outline"
                            onClick={() => setToggleEdit(!toggleEdit)}
                          >
                            <FaPencilAlt /> Upravit
                          </Toggle>
                        </div>
                        <div className="inline-flex self-end">
                          <DialogDelete
                            handleDeleteTraining={handleDeleteTraining}
                            id={training.id}
                          />
                        </div>
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
