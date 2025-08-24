import Header from "@/components/Header.tsx";
import CalendarTrainingLi from "@/components/kalendar/CalendarTrainingLi.tsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar.tsx";
import { authClient } from "@/lib/auth-client.ts";
import { toLocalISODateString } from "@/utils/date-utils.ts";
import { fetchTrainings } from "@/utils/serverFn/trainings.ts";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_auth/kalendar/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Kalendář | GYM APPLICATION" },
      { name: "description", content: "Kalendář s dny tréninků" },
    ],
  }),
});

function RouteComponent() {
  const { data: session } = authClient.useSession();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { data: trainings } = useQuery({
    queryKey: ["workouts", session?.user.id],
    queryFn: () => fetchTrainings({ data: { userId: session?.user.id ?? "" } }),
    enabled: !!session,
  });

  function allDates() {
    return trainings?.map((training) => training.workoutDate);
  }

  const matchingTrainings = trainings?.filter(
    (training) => training.workoutDate === toLocalISODateString(date),
  );

  function formatDate(date: Date | null, formatString: string) {
    if (date) {
      return format(date, formatString, { locale: cs });
    }
    return "neplatne datum";
  }

  if (!session) return null;

  return (
    <>
      <div className="">
        <Header page="KALENDÁŘ" />

        <div className="max-w-[500px] mx-auto w-[90%] space-y-4 pb-8">
          <div className="">
            <Calendar
              locale={cs}
              mode="single"
              defaultMonth={date}
              selected={date}
              onSelect={(d) => d && setDate(d)}
              className="w-full rounded-2xl border border-border"
              components={{
                DayButton: ({ children, modifiers, day, ...props }) => {
                  const trainingsDates = allDates();
                  const dayString = toLocalISODateString(day.date);
                  const isSpecial = trainingsDates?.includes(dayString);

                  return (
                    <CalendarDayButton
                      day={day}
                      modifiers={modifiers}
                      {...props}
                      className={
                        isSpecial
                          ? "bg-ring/70 rounded-lg text-white font-bold"
                          : ""
                      }
                    >
                      {children}
                    </CalendarDayButton>
                  );
                },
              }}
            />
          </div>
          <div className="">
            <Accordion type="multiple" className="w-full space-y-2">
              {matchingTrainings?.map((training) => (
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
                        <CalendarIcon className="h-4 w-4" />
                        {formatDate(new Date(training.workoutDate), "PPPP")}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <div className="flex flex-col gap-2 items-stretch relative">
                      {training.workoutExercises.map((exercise, index) => (
                        <CalendarTrainingLi
                          key={exercise.id}
                          exercise={exercise}
                          index={index}
                          len={training.workoutExercises.length}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}
