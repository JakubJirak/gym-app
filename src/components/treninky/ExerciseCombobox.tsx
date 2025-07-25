import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { db } from "@/db";
import { exercises } from "@/db/schema.ts";
import { authClient } from "@/lib/auth-client.ts";
import { useQuery } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { useEffect } from "react";

type ExerciseSelect = {
  id: string;
  userId: string | null;
  name: string;
};

interface ExerciseComboboxProps {
  selectedStatus: ExerciseSelect | null;
  setSelectedStatus: (status: ExerciseSelect | null) => void; // ZMĚNA TADY
  exerciseId: string;
  selectExercise: (
    exerciseId: string | number,
    selected: ExerciseSelect,
  ) => void;
}

const getExById = createServerFn({ method: "GET" })
  .validator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    return db.select().from(exercises).where(eq(exercises.userId, data.userId));
  });

export function ExerciseCombobox({
  selectedStatus,
  setSelectedStatus,
  exerciseId,
  selectExercise,
}: ExerciseComboboxProps) {
  const { data: session } = authClient.useSession();
  const [open, setOpen] = React.useState(false);

  const { data: defaultExercises } = useQuery({
    queryKey: ["defaultExercises"],
    queryFn: () => getExById({ data: { userId: "default" } }),
  });

  const { data: customExercises } = useQuery({
    queryKey: ["customExercises", session?.user.id],
    queryFn: () => getExById({ data: { userId: session?.user.id ?? "" } }),
    enabled: !!session,
  });

  const exercises: ExerciseSelect[] = [
    ...(customExercises ?? []),
    ...(defaultExercises ?? []),
  ];

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (selectedStatus) selectExercise(exerciseId, selectedStatus);
  }, [selectedStatus]);

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selectedStatus ? <>{selectedStatus.name}</> : <>Vyber cvik</>}
          </Button>
        </DrawerTrigger>
        <DrawerTitle className="hidden">title</DrawerTitle>
        <DrawerDescription className="hidden">description</DrawerDescription>
        <DrawerContent className="h-[70vh] max-h-[50vh]">
          <div className="h-full overflow-auto max-w-[500px] lg:min-w-[500px] lg:mx-auto">
            <StatusList
              setOpen={setOpen}
              setSelectedStatus={setSelectedStatus}
              exercises={exercises}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function StatusList({
  setOpen,
  setSelectedStatus,
  exercises,
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: ExerciseSelect | null) => void;
  exercises: ExerciseSelect[];
}) {
  return (
    <Command className="w-full">
      <CommandInput placeholder="Vyhledej cvik..." />
      <CommandList className="max-h-[55vh]">
        <CommandEmpty>Žádný cvik se nenašel.</CommandEmpty>
        <CommandGroup>
          {exercises.map((status) => (
            <CommandItem
              className="text-base p-2"
              key={status.name}
              value={status.name}
              onSelect={(value) => {
                setSelectedStatus(
                  exercises.find((priority) => priority.name === value) || null,
                );
                setOpen(false);
              }}
            >
              {status.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
