import Header from "@/components/Header.tsx";
import { AddExercise } from "@/components/cviky/AddExercise.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { db } from "@/db";
import { exercises } from "@/db/schema.ts";
import { authClient } from "@/lib/auth-client.ts";
import { getExWithMuscleGroup } from "@/utils/serverFn/trainings.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
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

const addCustomEx = createServerFn({ method: "POST" })
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

  const sortedDefaultExercises = defaultExercises?.reduce<SortedExercises>(
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

  const sortedCustomExercises = allExercises?.reduce<SortedExercises>(
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

  if (!session || isDefaultLoading || isCustomLoading)
    return (
      <>
        <Header page="CVIKY" />
      </>
    );

  if (
    defaultExercises === undefined ||
    customExercises === undefined ||
    sortedDefaultExercises === undefined ||
    sortedCustomExercises === undefined
  )
    return null;

  return (
    <div>
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

        <div>
          {Object.entries(sortedCustomExercises).map(
            ([muscleGroup, exercises], idx, arr) => (
              <div key={muscleGroup} className="pl-1 mt-3">
                <h3 className="font-semibold text-lg mb-2">{muscleGroup}</h3>
                {exercises.map((exercise) => (
                  <div key={exercise.id}>
                    <div className="my-1 rounded-xl flex justify-between items-center mb-2">
                      <p>{exercise.name}</p>
                    </div>
                  </div>
                ))}
                {idx < arr.length - 1 && <Separator />}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
