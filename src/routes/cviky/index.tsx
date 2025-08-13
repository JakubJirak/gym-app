import Header from "@/components/Header.tsx";
import { AddExercise } from "@/components/cviky/AddExercise.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { db } from "@/db";
import { exercises } from "@/db/schema.ts";
import { authClient } from "@/lib/auth-client.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { CirclePlus, Dumbbell, Wrench } from "lucide-react";
import { nanoid } from "nanoid";
import { useState } from "react";

const getExById = createServerFn({ method: "GET" })
  .validator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    return db.select().from(exercises).where(eq(exercises.userId, data.userId));
  });

const addCustomEx = createServerFn({ method: "POST" })
  .validator((data: { userId: string; id: string; name: string }) => data)
  .handler(async ({ data }) => {
    await db
      .insert(exercises)
      .values({ id: data.id, name: data.name, userId: data.userId });
  });

export const Route = createFileRoute("/cviky/")({
  beforeLoad: ({ context }) => {
    if (!context.session) {
      throw redirect({
        to: "/login",
      });
    }
  },
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

function RouteComponent() {
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
  const [exName, setExName] = useState<string>("");

  const { data: defaultExercises, isLoading: isDefaultLoading } = useQuery({
    queryKey: ["defaultExercises"],
    queryFn: () => getExById({ data: { userId: "default" } }),
  });

  const { data: customExercises, isLoading: isCustomLoading } = useQuery({
    queryKey: ["customExercises", session?.user.id],
    queryFn: () => getExById({ data: { userId: session?.user.id ?? "" } }),
    enabled: !!session,
  });

  const addExMutation = useMutation({
    mutationFn: addCustomEx,
    onSuccess: () =>
      void queryClient.invalidateQueries({ queryKey: ["customExercises"] }),
  });

  const handleAddExercise = (exN: string) => {
    addExMutation.mutate({
      data: {
        id: nanoid(10),
        name: exN,
        userId: session?.user.id ?? "",
      },
    });
  };

  if (!session || isDefaultLoading || isCustomLoading)
    return (
      <>
        <Header page="CVIKY" />
      </>
    );

  if (defaultExercises === undefined || customExercises === undefined)
    return null;

  return (
    <div>
      <Header page="CVIKY" />

      <Tabs
        defaultValue="custom"
        className="max-w-[500px] mx-auto w-[90%] space-y-4 pb-8"
      >
        <TabsList className="w-full bg-secondary">
          <TabsTrigger value="custom">Vlastní cviky</TabsTrigger>
          <TabsTrigger value="default">Defaultní cviky</TabsTrigger>
        </TabsList>
        <TabsContent value="custom">
          <div className="flex justify-between items-center mb-6 pl-1">
            <div className="">
              <h2 className="font-semibold text-lg flex gap-2 items-center mb-1">
                <CirclePlus size={20} />
                Vaše vlastní cviky
              </h2>
              <p className="text-muted-foreground text-sm">
                Zde jsou všechny vaše vlastní cviky
              </p>
            </div>

            <AddExercise
              exName={exName}
              setExName={setExName}
              handleAddExercise={handleAddExercise}
            />
          </div>

          {customExercises.length === 0 ? (
            <p className="text-muted-foreground mt-4">
              Ještě nemáte žádné vlastní cviky
            </p>
          ) : (
            <div className="space-y-2">
              {customExercises.map((exercise) => (
                <div
                  className="border border-border p-2 rounded-xl"
                  key={exercise.id}
                >
                  {exercise.name}
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="default">
          <div className="pl-1 mb-6">
            <h2 className="font-semibold text-lg flex gap-2 items-center mb-1">
              <Dumbbell size={20} />
              Defaultní cviky
            </h2>
            <p className="text-muted-foreground text-sm">
              Zde jsou všechny defaultní cviky.
            </p>
          </div>

          <div className="space-y-2">
            {defaultExercises.map((exercise) => (
              <div
                className="border border-border p-2 rounded-xl"
                key={exercise.id}
              >
                {exercise.name}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
