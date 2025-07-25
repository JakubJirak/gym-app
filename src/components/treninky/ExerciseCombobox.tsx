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
import { useEffect } from "react";

type ExerciseSelect = {
  id: string;
  name: string;
};

const exerciseOptions: ExerciseSelect[] = [
  { id: "sq", name: "Squat" },
  { id: "bp", name: "Bench Press" },
  { id: "dl", name: "Deadlift" },
  { id: "psq", name: "Paused Squat" },
  { id: "pbp", name: "Paused BP" },
  { id: "caj", name: "Clean & Jerk" },
  { id: "latr", name: "Lat. raises" },
  { id: "dbrear", name: "Db. rear delts" },
  { id: "ezbar", name: "EZ Bar curls" },
  { id: "hamc", name: "Hammer curls" },
  { id: "shdb", name: "Shoulder db. press" },
  { id: "pullup", name: "Pull up" },
  { id: "hsrow", name: "HS Row" },
  { id: "chpr", name: "Chest press" },
  { id: "latpdwn", name: "Lat. pulldown Neut." },
  { id: "trex", name: "Triceps ex." },
  { id: "absw", name: "Abs wheel" },
];

interface ExerciseComboboxProps {
  selectedStatus: ExerciseSelect | null;
  setSelectedStatus: (status: ExerciseSelect | null) => void; // ZMĚNA TADY
  exerciseId: string;
  selectExercise: (
    exerciseId: string | number,
    selected: ExerciseSelect,
  ) => void;
}

export function ExerciseCombobox({
  selectedStatus,
  setSelectedStatus,
  exerciseId,
  selectExercise,
}: ExerciseComboboxProps) {
  const [open, setOpen] = React.useState(false);

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
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: ExerciseSelect | null) => void;
}) {
  return (
    <Command className="w-full">
      <CommandInput placeholder="Vyhledej cvik..." />
      <CommandList className="max-h-[55vh]">
        <CommandEmpty>Žádný cvik se nenašel.</CommandEmpty>
        <CommandGroup>
          {exerciseOptions.map((status) => (
            <CommandItem
              className="text-base p-2"
              key={status.name}
              value={status.name}
              onSelect={(value) => {
                setSelectedStatus(
                  exerciseOptions.find((priority) => priority.name === value) ||
                    null,
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
