import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { Calendar, Dumbbell } from "lucide-react";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { GiWeightLiftingUp } from "react-icons/gi";
import TrainingDialog, { type Training } from "../AddNewTraining.tsx";

export interface Set {
  id: string;
  reps: string;
  weight: string;
}

const TrainingsList = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);

  const handleSaveTraining = (training: Training) => {
    setTrainings((prev) =>
      [training, ...prev].sort((a, b) => b.date.getTime() - a.date.getTime()),
    );
  };

  const formatSetInfo = (set: Set) => {
    const parts = [];
    if (set.weight) parts.push(`${set.weight}kg`);
    if (set.reps) parts.push(`${set.reps}`);
    return parts.join(" × ") || "Prázdná série";
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
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
                            {format(training.date, "PPPP", { locale: cs })}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        Cviky: {training.exercises.length}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      {training.exercises.map((exercise) => (
                        <div
                          key={exercise.id}
                          className="border rounded-lg p-4 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-lg">
                              {exercise.name}
                            </h4>
                            <Badge variant="outline">
                              Série: {exercise.sets.length}
                            </Badge>
                          </div>

                          <div>
                            <div className="grid gap-2">
                              {exercise.sets.map((set, setIndex) => (
                                <div
                                  key={set.id}
                                  className="flex items-center justify-between bg-secondary rounded-md py-2 px-3"
                                >
                                  <span className="text-sm font-medium">
                                    {setIndex + 1}. série
                                  </span>
                                  <span className="text-sm">
                                    {formatSetInfo(set)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {exercise.notes && <Separator />}

                          {exercise.notes && (
                            <div className="bg-secondary rounded-md p-3">
                              <p className="text-base text-muted-foreground">
                                {exercise.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ) : (
          <Card>
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
