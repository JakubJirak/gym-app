import Header from "@/components/Header.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { db } from "@/db";
import { userWeight } from "@/db/schema.ts";
import { authClient } from "@/lib/auth-client.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { Check, Pencil } from "lucide-react";
import type React from "react";
import { useState } from "react";

export const Route = createFileRoute("/profil/")({
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
      { title: "Profil | GYM APPLICATION" },
      { name: "description", content: "Informace o profilu uživatele" },
    ],
  }),
});

const fetchWeight = createServerFn({ method: "GET" })
  .validator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    return db
      .select()
      .from(userWeight)
      .where(eq(userWeight.userId, data.userId));
  });

const addWeight = createServerFn({ method: "POST" })
  .validator((data: { userId: string; weight: string }) => data)
  .handler(async ({ data }) => {
    await db
      .insert(userWeight)
      .values({ userId: data.userId, weight: data.weight })
      .execute();
  });

const updateWeight = createServerFn({ method: "POST" })
  .validator((data: { userId: string; weight: string }) => data)
  .handler(async ({ data }) => {
    await db
      .update(userWeight)
      .set({ weight: data.weight })
      .where(eq(userWeight.userId, data.userId))
      .execute();
  });

function RouteComponent() {
  const { data: session } = authClient.useSession();
  const queryClient = useQueryClient();
  const [weight, setWeight] = useState<string>("");
  const [changeWeight, setChangeWeight] = useState<boolean>(false);

  const { data: weightData } = useQuery({
    queryKey: ["userWeight", session?.user.id],
    queryFn: () => fetchWeight({ data: { userId: session?.user.id ?? "" } }),
  });

  const addWeightMutation = useMutation({
    mutationFn: addWeight,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userWeight"] }),
  });

  const updateWeightMutation = useMutation({
    mutationFn: updateWeight,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userWeight"] }),
  });

  const handleAddWeight = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addWeightMutation.mutate({
      data: { userId: session?.user.id ?? "", weight: weight },
    });
  };

  const handleChangeWeight = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    updateWeightMutation.mutate({
      data: { userId: session?.user.id ?? "", weight: weight },
    });
    setChangeWeight(false);
    setWeight("");
  };

  if (!session) return null;

  return (
    <div>
      <Header page="PROFIL" />
      <div className="max-w-[500px] w-[90%] mx-auto space-y-4">
        <Card className="p-4">
          <CardContent className="px-2">
            <div className="space-y-2">
              <div>
                <p className="text-muted-foreground">Uživatelské jméno</p>
                <p>{session.user.name}</p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground">Email</p>
                <p>{session.user.email}</p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground">Založení účtu</p>
                <p>{session.user.createdAt.toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {weightData === undefined || weightData.length === 0 ? (
          <Card className="p-4">
            <CardContent className="px-2">
              <form
                className="flex gap-2 items-center"
                onSubmit={handleAddWeight}
              >
                <p>Vaše váha (kg):</p>
                <Input
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="max-w-[70px]"
                  type="number"
                  min="10"
                  max="500"
                  step="0.01"
                  required
                />
                <Button type="submit" className="ml-auto" size="icon">
                  <Check />
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="p-4">
            <CardContent className="px-0">
              {changeWeight ? (
                <form
                  className="flex gap-2 items-center"
                  onSubmit={handleChangeWeight}
                >
                  <p>Vaše váha (kg):</p>
                  <Input
                    autoFocus
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="max-w-[70px]"
                    type="number"
                    min="10"
                    max="500"
                    step="0.01"
                    required
                  />
                  <Button type="submit" className="ml-auto" size="icon">
                    <Check />
                  </Button>
                </form>
              ) : (
                <div className="flex gap-2 items-center">
                  <p>Vaše váha:</p>
                  <p>{weightData[0]?.weight}kg</p>
                  <Button
                    type="button"
                    size="icon"
                    className="ml-auto"
                    onClick={() => setChangeWeight(true)}
                  >
                    <Pencil />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
