import Header from "@/components/Header.tsx";
import { AddExercise } from "@/components/cviky/AddExercise.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { db } from "@/db";
import { exercises } from "@/db/schema.ts";
import { authClient } from "@/lib/auth-client.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
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
});

function RouteComponent() {
  const { data: session } = authClient.useSession();
  const [exName, setExName] = useState<string>("");

  const { data: defaultExercises, isLoading: isDefaultLoading } = useQuery({
    queryKey: ["defaultExercises"],
    queryFn: () => getExById({ data: { userId: "default" } }),
  });

  const {
    data: customExercises,
    isLoading: isCustomLoading,
    refetch,
  } = useQuery({
    queryKey: ["customExercises", session?.user.id],
    queryFn: () => getExById({ data: { userId: session?.user.id ?? "" } }),
    enabled: !!session,
  });

  const addExMutation = useMutation({
    mutationFn: addCustomEx,
    onSuccess: () => refetch(),
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
        <p>Načítání dat</p>
      </>
    );

  if (defaultExercises === undefined || customExercises === undefined)
    return null;

  return (
    <div>
      <Header page="CVIKY" />
      <div className="w-[90%] max-w-[500px] mx-auto space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Vaše vlastní cviky</CardTitle>
            <CardDescription>
              Zde jsou všechny vaše vlastní cviky
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddExercise
              exName={exName}
              setExName={setExName}
              handleAddExercise={handleAddExercise}
            />
            {customExercises.length === 0 ? (
              <p className="text-muted-foreground mt-4">
                Ještě nemáte žádné vlastní cviky
              </p>
            ) : (
              <ScrollArea className="overflow-auto max-h-60 border border-border p-3 rounded-xl mt-4">
                <div className="">
                  {customExercises.map((exercise) => (
                    <div key={exercise.id}>{exercise.name}</div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Defaultní cviky</CardTitle>
            <CardDescription>Zde jsou všechny defaultní cviky.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="overflow-auto max-h-40 border border-border p-3 rounded-xl">
              <div className="grid gap-1 ">
                {defaultExercises.map((exercise) => (
                  <div key={exercise.id}>{exercise.name}</div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
