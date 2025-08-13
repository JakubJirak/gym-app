import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { db } from "@/db";
import { userGoals } from "@/db/schema.ts";
import { authClient } from "@/lib/auth-client.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { Pencil } from "lucide-react";
import { type FormEvent, useState } from "react";

const addGoals = createServerFn({ method: "POST" })
  .validator(
    (data: {
      userId: string;
      squat: string;
      bench: string;
      deadlift: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    await db.insert(userGoals).values({
      userId: data.userId,
      squat: data.squat,
      bench: data.bench,
      deadlift: data.deadlift,
    });
  });

const updateGoals = createServerFn({ method: "POST" })
  .validator(
    (data: {
      userId: string;
      squat: string;
      bench: string;
      deadlift: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    await db
      .update(userGoals)
      .set({
        squat: data.squat,
        bench: data.bench,
        deadlift: data.deadlift,
      })
      .where(eq(userGoals.userId, data.userId));
  });

const getGoals = createServerFn({ method: "GET" })
  .validator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    return db.select().from(userGoals).where(eq(userGoals.userId, data.userId));
  });

const UserSetGoals = () => {
  const [squat, setSquat] = useState("");
  const [bench, setBench] = useState("");
  const [deadlift, setDeadlift] = useState("");
  const { data: session } = authClient.useSession();
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState<boolean>(false);

  const { data: goals } = useQuery({
    queryKey: ["userGoals", session?.user.id ?? ""],
    queryFn: () => getGoals({ data: { userId: session?.user.id ?? "" } }),
    enabled: !!session,
  });

  const addGoalsMutation = useMutation({
    mutationFn: addGoals,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["userGoals"] }),
  });

  const updateGoalsMutation = useMutation({
    mutationFn: updateGoals,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["userGoals"] }),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (edit) {
      updateGoalsMutation.mutate({
        data: {
          userId: session?.user.id ?? "",
          squat,
          bench,
          deadlift,
        },
      });
    } else {
      addGoalsMutation.mutate({
        data: {
          userId: session?.user.id ?? "",
          squat,
          bench,
          deadlift,
        },
      });
    }

    setEdit(false);
    setSquat("");
    setBench("");
    setDeadlift("");
  };

  return (
    <Card className="p-4">
      <CardHeader className="px-0">
        <div className="flex justify-between items-center">
          <CardTitle>Cíle pro Powerlifting (kg)</CardTitle>
          {goals === undefined || goals.length === 0 ? null : (
            <Button size="icon" onClick={() => setEdit(true)}>
              <Pencil />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-0">
        {goals === undefined || goals.length === 0 || edit ? (
          <form
            className="flex flex-col gap-3 mt-[-8px]"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="grid grid-cols-[60px_1fr] gap-2 items-center">
              <p>Squat:</p>
              <Input
                value={squat}
                onChange={(e) => setSquat(e.target.value)}
                className="max-w-[100px]"
                type="number"
                min="10"
                max="500"
                step="0.01"
                required
              />
            </div>
            <div className="grid grid-cols-[60px_1fr] gap-2 items-center">
              <p>Bench:</p>
              <Input
                value={bench}
                onChange={(e) => setBench(e.target.value)}
                className="max-w-[100px]"
                type="number"
                min="10"
                max="500"
                step="0.01"
                required
              />
            </div>
            <div className="grid grid-cols-[60px_1fr] gap-2 items-center">
              <p>Deadlift:</p>
              <Input
                value={deadlift}
                onChange={(e) => setDeadlift(e.target.value)}
                className="max-w-[100px]"
                type="number"
                min="10"
                max="500"
                step="0.01"
                required
              />
            </div>
            <Button className="mt-2" type="submit">
              Uložit cíle
            </Button>
          </form>
        ) : (
          <div className="flex flex-col gap-3 mt-[-8px]">
            <div className="grid grid-cols-[60px_1fr] gap-2 items-center">
              <p>Squat:</p>
              <p>{goals[0].squat}kg</p>
            </div>
            <div className="grid grid-cols-[60px_1fr] gap-2 items-center">
              <p>Bench:</p>
              <p>{goals[0].bench}kg</p>
            </div>
            <div className="grid grid-cols-[60px_1fr] gap-2 items-center">
              <p>Deadlift:</p>
              <p>{goals[0].deadlift}kg</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserSetGoals;
