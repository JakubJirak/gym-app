import Header from "@/components/Header.tsx";
import { AddExercise } from "@/components/cviky/AddExercise.tsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { authClient } from "@/lib/auth-client.ts";
import {
  addCustomEx,
  getExWithMuscleGroup,
} from "@/utils/serverFn/trainings.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Dumbbell } from "lucide-react";
import { nanoid } from "nanoid";

export const Route = createFileRoute("/_auth/cviky/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Cviky | GYM APPLICATION" },
      {
        name: "description",
        content: "Seznam všech základních a vlastních cviků uživatele",
      },
    ],
  }),
});

type Exercise = {
  id: string;
  name: string;
  muscleGroupName: string | null;
};

type SortedExercises = {
  [muscleGroup: string]: Exercise[];
};

function RouteComponent() {
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();

  const { data: defaultExercises, isLoading: isDefaultLoading } = useQuery({
    queryKey: ["defaultExercises"],
    queryFn: () => getExWithMuscleGroup({ data: { userId: "default" } }),
  });

  const { data: customExercises, isLoading: isCustomLoading } = useQuery({
    queryKey: ["customExercises", session?.user.id],
    queryFn: () =>
      getExWithMuscleGroup({ data: { userId: session?.user.id ?? "" } }),
    enabled: !!session,
  });

  const addExMutation = useMutation({
    mutationFn: addCustomEx,
    onSuccess: () =>
      void queryClient.invalidateQueries({ queryKey: ["customExercises"] }),
  });

  const handleAddExercise = (exN: string, mgId: string) => {
    addExMutation.mutate({
      data: {
        id: nanoid(10),
        name: exN,
        userId: session?.user.id ?? "",
        mgId: mgId,
      },
    });
  };

  const allExercises = [
    ...(defaultExercises ?? []),
    ...(customExercises ?? []),
  ];

  const sortedExercises = allExercises?.reduce<SortedExercises>(
    (acc, exercise) => {
      if (exercise.muscleGroupName === null) return acc;
      if (!acc[exercise.muscleGroupName]) {
        acc[exercise.muscleGroupName] = [];
      }
      acc[exercise.muscleGroupName].push(exercise);
      return acc;
    },
    {},
  );

  const muscleGroups = Object.keys(sortedExercises);

  if (!session || isDefaultLoading || isCustomLoading)
    return (
      <>
        <Header page="CVIKY" />
      </>
    );

  if (
    defaultExercises === undefined ||
    customExercises === undefined ||
    sortedExercises === undefined
  )
    return null;

  return (
    <div className="pb-8">
      <Header page="CVIKY" />

      <div className="max-w-[500px] mx-auto w-[90%] space-y-4 pb-8">
        <div className="flex justify-between items-center mb-4 pl-1">
          <div className="">
            <h2 className="font-semibold text-lg flex gap-2 items-center mb-1">
              <Dumbbell size={20} />
              Vaše cviky
            </h2>
            <p className="text-muted-foreground text-sm">
              Zde jsou všechny vaše cviky
            </p>
          </div>

          <AddExercise handleAddExercise={handleAddExercise} defaultName="" />
        </div>

        <Accordion
          type="multiple"
          className="w-full"
          defaultValue={muscleGroups}
        >
          {Object.entries(sortedExercises).map(([muscleGroup, exercises]) => (
            <AccordionItem key={muscleGroup} value={muscleGroup}>
              <AccordionTrigger className="text-base font-bold pb-2 pt-3 hover:no-underline">
                {muscleGroup}
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                <div className="pl-2 mt-2 space-y-2">
                  {exercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className="my-1 rounded-xl text-base flex justify-between items-center"
                    >
                      <p>{exercise.name}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
