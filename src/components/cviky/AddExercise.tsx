import { Button } from "@/components/ui/button.tsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { db } from "@/db";
import { muscleGroups } from "@/db/schema.ts";
import { cn } from "@/lib/utils.ts";
import { useQuery } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface DialogEditSet {
  handleAddExercise: (exN: string, mgId: string) => void;
  defaultName: string;
}

const getMuscleGroups = createServerFn({ method: "GET" }).handler(async () => {
  return db.select().from(muscleGroups);
});

export function AddExercise({ handleAddExercise, defaultName }: DialogEditSet) {
  const [open, setOpen] = useState<boolean>(false);
  const [popOpen, setPopOpen] = useState<boolean>(false);
  const [exName, setExName] = useState(defaultName);
  const [value, setValue] = useState("");

  const { data: muscleGroups } = useQuery({
    queryKey: ["muscleGroups"],
    queryFn: () => getMuscleGroups(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (value !== "") {
      handleAddExercise(exName, value);
      setOpen(false);
      setValue("");
    }
  };

  if (muscleGroups === undefined) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button size="icon">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] h-auto">
          <DialogHeader>
            <DialogTitle>Přidat vlastní cvik</DialogTitle>
            <DialogDescription>
              Zde si můžete přidat vlastní cvik.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="cvik">Jméno cviku</Label>
                <Input
                  placeholder="Název cviku"
                  value={exName}
                  onChange={(e) => setExName(e.target.value)}
                  id="cvik"
                  name="cvik"
                  type="text"
                  required
                />
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="cvik">Jméno části těla</Label>
              <Popover open={popOpen} onOpenChange={setPopOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    aria-expanded={popOpen}
                    className="w-full justify-between"
                  >
                    {value
                      ? muscleGroups.find(
                          (muscleGroup) => muscleGroup.id === value,
                        )?.muscleGroup
                      : "Vyber část těla..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandList>
                      <CommandEmpty>Nic se nenašlo.</CommandEmpty>
                      <CommandGroup>
                        {muscleGroups.map((muscleGroup) => (
                          <CommandItem
                            key={muscleGroup.id}
                            value={muscleGroup.id} // Tady je id!
                            // currentValue je id, proto porovnáváme s value (taky id)
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue,
                              );
                              setPopOpen(false);
                            }}
                          >
                            {muscleGroup.muscleGroup}
                            <Check
                              className={cn(
                                "ml-auto",
                                value === muscleGroup.id
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Zrušit</Button>
              </DialogClose>
              <Button type="submit">Uložit cvik</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
}
