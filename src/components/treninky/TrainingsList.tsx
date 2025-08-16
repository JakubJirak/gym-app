import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { Calendar, Dumbbell } from "lucide-react";

import { DialogAddExercise } from "@/components/treninky/editDialogs/DialogAddExercise.tsx";
import DialogDelete from "@/components/treninky/editDialogs/DialogDeleteTraining.tsx";
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
import { authClient } from "@/lib/auth-client.ts";
import { toLocalISODateString } from "@/utils/date-utils.ts";
import { exerciseDb, setsDb } from "@/utils/db-format-utils.ts";
import {
  addTraining,
  fetchTrainings,
  getExById,
} from "@/utils/serverFn/trainings.ts";
import type {
  ExerciseSelectWithID,
  SetType,
} from "@/utils/types/trainingsTypes.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import TrainingDialog, { type Training } from "./AddNewTraining.tsx";
import TrainingLi from "./TrainingLi.tsx";

interface TrainingsListProp {
  userId: string;
}

const TrainingsList = ({ userId }: TrainingsListProp) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();

  const { data: defaultExercises } = useQuery({
    queryKey: ["defaultExercises"],
    queryFn: () => getExById({ data: { userId: "default" } }),
    enabled: !!session,
  });

  const { data: customExercises } = useQuery({
    queryKey: ["customExercises", session?.user.id],
    queryFn: () => getExById({ data: { userId: session?.user.id ?? "" } }),
    enabled: !!session,
  });

  const exercises: ExerciseSelectWithID[] = [
    ...(customExercises ?? []),
    ...(defaultExercises ?? []),
  ];

  const mutationTrainings = useMutation({
    mutationFn: addTraining,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
    onError: (error: Error) => console.error(error),
  });

  const { data: trainings, isLoading } = useQuery({
    queryKey: ["workouts", userId],
    queryFn: () => fetchTrainings({ data: { userId } }),
    enabled: !!session,
  });

  function formatDate(date: Date | null, formatString: string) {
    if (date) {
      return format(date, formatString, { locale: cs });
    }
    return "neplatne datum";
  }

  async function handleSaveTraining(training: Training) {
    handleAddTraining(training);
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

  const formatSetInfo = (set: SetType) => {
    const parts = [];
    if (set.weight) parts.push(`${set.weight}kg`);
    if (set.reps) parts.push(`${set.reps}`);
    return parts.join(" × ") || "Prázdná série";
  };

  if (trainings === undefined) return null;

  if (trainings === undefined && !isLoading)
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
                          toggleEdit={toggleEdit}
                          exercises={exercises}
                        />
                      ))}
                      <div className={`${toggleEdit ? "" : "hidden"}`}>
                        <DialogAddExercise
                          exercises={exercises}
                          trainingId={training.id}
                          order={training.workoutExercises.length}
                        />
                      </div>
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
                          <DialogDelete id={training.id} />
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
