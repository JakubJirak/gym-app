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

type Status = {
  id: number;
  name: string;
};

const exerciseOptions: Status[] = [
  { id: 1, name: "Squat" },
  { id: 2, name: "Bench Press" },
  { id: 3, name: "Deadlift" },
  { id: 4, name: "Paused Squat" },
  { id: 5, name: "Paused BP" },
  { id: 6, name: "Clean & Jerk" },
  { id: 7, name: "Lat. raises" },
  { id: 8, name: "Db. rear delts" },
  { id: 9, name: "EZ Bar curls" },
  { id: 10, name: "Hammer curls" },
  { id: 11, name: "Shoulder db. press" },
  { id: 12, name: "Pull up" },
  { id: 13, name: "HS Row" },
  { id: 14, name: "Chest press" },
  { id: 15, name: "Lat. pulldown Neut." },
  { id: 16, name: "Triceps ex." },
  { id: 17, name: "Abs wheel" },
];

interface ExerciseComboboxProps {
  selectedStatus: Status | null;
  setSelectedStatus: React.Dispatch<React.SetStateAction<Status | null>>;
  exerciseId: string;
  selectExercise: (exerciseId: string | number, selected: Status) => void;
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
  setSelectedStatus: (status: Status | null) => void;
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
