import * as React from "react";

import { AddExercise } from "@/components/cviky/AddExercise.tsx";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

type ExerciseSelectWithID = {
  id: string;
  userId: string | null;
  name: string;
};

type ExerciseSelect = {
  id: string;
  name: string;
};

interface ExerciseComboboxProps {
  selectedStatus: ExerciseSelect | null;
  setSelectedStatus: (status: ExerciseSelect | null) => void;
  exerciseId: string;
  selectExercise?: (
    exerciseId: string | number,
    selected: ExerciseSelect,
  ) => void;
  exercises: ExerciseSelectWithID[];
}

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

export function ExerciseCombobox({
  selectedStatus,
  setSelectedStatus,
  exerciseId,
  selectExercise,
  exercises,
}: ExerciseComboboxProps) {
  const [open, setOpen] = React.useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (selectedStatus && selectExercise)
      selectExercise(exerciseId, selectedStatus);
  }, [selectedStatus]);

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" className="w-full justify-start" autoFocus>
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
  exercises: ExerciseSelectWithID[];
}) {
  const queryClient = useQueryClient();
  const [searchVal, setSearchVal] = useState<string>("");
  const { data: session } = authClient.useSession();

  const addExMutation = useMutation({
    mutationFn: addCustomEx,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["customExercises"] });
    },
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

  return (
    <Command className="w-full">
      <CommandInput
        placeholder="Vyhledej cvik..."
        autoFocus
        value={searchVal}
        onValueChange={(e) => setSearchVal(e)}
      />
      <CommandList className="max-h-[55vh]">
        <CommandEmpty className="p-4 text-muted-foreground text-sm text-center">
          <AddExercise
            handleAddExercise={handleAddExercise}
            defaultName={searchVal}
          />
        </CommandEmpty>
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
