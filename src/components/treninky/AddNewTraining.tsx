import { format } from "date-fns";
import { cs } from "date-fns/locale";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// Sample exercise options
const exerciseOptions = [
  "Bench Press",
  "Squat",
  "Deadlift",
  "Pull-ups",
  "Push-ups",
  "Overhead Press",
  "Barbell Row",
  "Dumbbell Curl",
  "Tricep Dips",
  "Lunges",
  "Plank",
  "Burpees",
  "Leg Press",
  "Lat Pulldown",
  "Shoulder Press",
  "Leg Curl",
  "Leg Extension",
  "Calf Raises",
  "Face Pulls",
  "Hip Thrust",
];

export interface Set {
  id: string;
  reps: string;
  weight: string;
}

export interface Exercise {
  id: string;
  name: string;
  notes: string;
  sets: Set[];
}

export interface Training {
  id: string;
  name: string;
  date: Date;
  exercises: Exercise[];
}

interface TrainingDialogProps {
  onSave: (training: Training) => void;
}

const AddNewTraining = ({ onSave }: TrainingDialogProps) => {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    name: "",
    date: undefined as Date | undefined,
    exercises: [] as Exercise[],
  });

  const [customExercises, setCustomExercises] = useState<string[]>([]);
  const [openComboboxes, setOpenComboboxes] = useState<{
    [key: string]: boolean;
  }>({});
  const [searchValues, setSearchValues] = useState<{ [key: string]: string }>(
    {},
  );

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: "",
      notes: "",
      sets: [{ id: Date.now().toString(), reps: "", weight: "" }],
    };
    setTraining((prev) => ({
      ...prev,
      exercises: [...prev.exercises, newExercise],
    }));
  };

  const removeExercise = (exerciseId: string) => {
    setTraining((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((ex) => ex.id !== exerciseId),
    }));
    // Clean up combobox states
    setOpenComboboxes((prev) => {
      const newState = { ...prev };
      delete newState[exerciseId];
      return newState;
    });
    setSearchValues((prev) => {
      const newState = { ...prev };
      delete newState[exerciseId];
      return newState;
    });
  };

  const updateExercise = (
    exerciseId: string,
    field: keyof Exercise,
    value: string,
  ) => {
    setTraining((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, [field]: value } : ex,
      ),
    }));
  };

  const addSet = (exerciseId: string) => {
    const newSet: Set = {
      id: Date.now().toString(),
      reps: "",
      weight: "",
    };
    setTraining((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, sets: [...ex.sets, newSet] } : ex,
      ),
    }));
  };

  const removeSet = (exerciseId: string, setId: string) => {
    setTraining((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) =>
        ex.id === exerciseId
          ? { ...ex, sets: ex.sets.filter((set) => set.id !== setId) }
          : ex,
      ),
    }));
  };

  const updateSet = (
    exerciseId: string,
    setId: string,
    field: keyof Set,
    value: string,
  ) => {
    setTraining((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: ex.sets.map((set) =>
                set.id === setId ? { ...set, [field]: value } : set,
              ),
            }
          : ex,
      ),
    }));
  };

  const addCustomExercise = (exerciseId: string, exerciseName: string) => {
    const trimmedName = exerciseName.trim();
    if (
      trimmedName &&
      !customExercises.includes(trimmedName) &&
      !exerciseOptions.includes(trimmedName)
    ) {
      setCustomExercises((prev) => [...prev, trimmedName]);
      updateExercise(exerciseId, "name", trimmedName);
      setOpenComboboxes((prev) => ({ ...prev, [exerciseId]: false }));
      setSearchValues((prev) => ({ ...prev, [exerciseId]: "" }));
    }
  };

  const selectExercise = (exerciseId: string, exerciseName: string) => {
    updateExercise(exerciseId, "name", exerciseName);
    setOpenComboboxes((prev) => ({ ...prev, [exerciseId]: false }));
    setSearchValues((prev) => ({ ...prev, [exerciseId]: "" }));
  };

  const isValidTraining = () => {
    if (
      !training.name.trim() ||
      !training.date ||
      training.exercises.length === 0
    ) {
      return false;
    }

    return training.exercises.every((exercise) => {
      if (!exercise.name.trim()) return false;
      return exercise.sets.some(
        (set) => set.reps.trim() !== "" || set.weight.trim() !== "",
      );
    });
  };

  const handleSave = () => {
    if (!isValidTraining() || !training.date) return;

    const newTraining: Training = {
      id: Date.now().toString(),
      name: training.name,
      date: training.date,
      exercises: training.exercises,
    };

    onSave(newTraining);
    setOpen(false);
    // Reset form
    setTraining({
      name: "",
      date: undefined,
      exercises: [],
    });
    setOpenComboboxes({});
    setSearchValues({});
  };

  const handleCancel = () => {
    setOpen(false);
    // Reset form
    setTraining({
      name: "",
      date: undefined,
      exercises: [],
    });
    setOpenComboboxes({});
    setSearchValues({});
  };

  const allExercises = [...exerciseOptions, ...customExercises];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Přidat trénink</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-4 pt-6 max-h-[98vh] w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle>Přidat nový trénink</DialogTitle>
          <DialogDescription>
            Vytvořte nový trénink s cviky a sériemi.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[68dvh] min-h-[60dvh] pr-4">
          <div className="space-y-6">
            {/* Training Name */}
            <div className="space-y-2">
              <Label htmlFor="training-name">Název tréninku *</Label>
              <Input
                id="training-name"
                placeholder="Zadejte název tréninku"
                value={training.name}
                onChange={(e) =>
                  setTraining((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            {/* Date Picker */}
            <div className="space-y-2">
              <Label>Datum tréninku *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !training.date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {training.date
                      ? format(training.date, "PPP", { locale: cs })
                      : "Vyberte datum"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={training.date}
                    onSelect={(date) =>
                      setTraining((prev) => ({ ...prev, date }))
                    }
                    locale={cs}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Exercises */}
            <div className="space-y-4">
              <div className="flex items-center justify-between top-100 z-1000 w-full">
                <Label className="text-base font-semibold">Cviky *</Label>
                <Button onClick={addExercise} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Přidat cvik
                </Button>
              </div>

              {training.exercises.length > 0 && (
                <div className="space-y-4">
                  {training.exercises.map((exercise, exerciseIndex) => (
                    <div
                      key={exercise.id}
                      className="border rounded-lg bg-secondary p-4 space-y-4 pb-5 relative"
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex-1 space-y-2">
                          <Label className="text-sm font-medium">
                            {exerciseIndex + 1}. Cvik
                          </Label>
                          <Popover
                            open={openComboboxes[exercise.id] || false}
                            onOpenChange={(open) =>
                              setOpenComboboxes((prev) => ({
                                ...prev,
                                [exercise.id]: open,
                              }))
                            }
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                aria-expanded={
                                  openComboboxes[exercise.id] || false
                                }
                                className="w-full justify-between bg-transparent"
                              >
                                {exercise.name || "Vyberte cvik..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-full p-0"
                              align="start"
                            >
                              <Command>
                                <CommandInput
                                  placeholder="Hledat nebo přidat cvik..."
                                  value={searchValues[exercise.id] || ""}
                                  onValueChange={(value) =>
                                    setSearchValues((prev) => ({
                                      ...prev,
                                      [exercise.id]: value,
                                    }))
                                  }
                                />
                                <CommandList>
                                  <ScrollArea className="h-[200px]">
                                    <CommandEmpty>
                                      <div className="p-2 space-y-2">
                                        <p className="text-sm text-muted-foreground">
                                          Cvik nenalezen.
                                        </p>
                                        {(
                                          searchValues[exercise.id] || ""
                                        ).trim() && (
                                          <Button
                                            size="sm"
                                            onClick={() =>
                                              addCustomExercise(
                                                exercise.id,
                                                searchValues[exercise.id] || "",
                                              )
                                            }
                                            className="w-full"
                                          >
                                            <Plus className="h-3 w-3 mr-1" />
                                            Přidat "
                                            {(
                                              searchValues[exercise.id] || ""
                                            ).trim()}
                                            "
                                          </Button>
                                        )}
                                      </div>
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {allExercises
                                        .filter((option) =>
                                          option
                                            .toLowerCase()
                                            .includes(
                                              (
                                                searchValues[exercise.id] || ""
                                              ).toLowerCase(),
                                            ),
                                        )
                                        .map((option) => (
                                          <CommandItem
                                            key={option}
                                            value={option}
                                            onSelect={() =>
                                              selectExercise(
                                                exercise.id,
                                                option,
                                              )
                                            }
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                exercise.name === option
                                                  ? "opacity-100"
                                                  : "opacity-0",
                                              )}
                                            />
                                            {option}
                                            {customExercises.includes(
                                              option,
                                            ) && (
                                              <span className="ml-auto text-xs text-muted-foreground">
                                                (Vlastní)
                                              </span>
                                            )}
                                          </CommandItem>
                                        ))}
                                    </CommandGroup>
                                  </ScrollArea>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <Button
                          variant="muted"
                          size="icon-sm"
                          onClick={() => removeExercise(exercise.id)}
                          className="shrink-0 absolute top-2 right-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Serie */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">Série</Label>
                          <Button
                            onClick={() => addSet(exercise.id)}
                            size="sm"
                            variant="outline"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Přidat sérii
                          </Button>
                        </div>

                        <div className="space-y-2">
                          {exercise.sets.map((set, setIndex) => (
                            <div
                              key={set.id}
                              className="grid grid-cols-[1fr_1fr_32px] sm:grid-cols-3 gap-2 items-end"
                            >
                              <Label className="text-sm">
                                {setIndex + 1}. série
                              </Label>
                              <div className="sm:hidden" />
                              <div className="sm:hidden" />
                              <div className="hidden sm:block" />
                              <div className="hidden sm:block" />
                              <div>
                                <Label className="text-xs sr-only">Váha</Label>
                                <div className="text-xs mb-1 text-muted-foreground">
                                  Váha (kg)
                                </div>
                                <Input
                                  type="number"
                                  value={set.weight}
                                  onChange={(e) =>
                                    updateSet(
                                      exercise.id,
                                      set.id,
                                      "weight",
                                      e.target.value,
                                    )
                                  }
                                  className="h-8"
                                />
                              </div>
                              <div>
                                <div className="text-xs mb-1 text-muted-foreground">
                                  Opakování
                                </div>
                                <Input
                                  type="number"
                                  value={set.reps}
                                  onChange={(e) =>
                                    updateSet(
                                      exercise.id,
                                      set.id,
                                      "reps",
                                      e.target.value,
                                    )
                                  }
                                  className="h-8"
                                />
                              </div>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => removeSet(exercise.id, set.id)}
                                className="h-8 w-8 shrink-0"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Poznamky */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Poznámky (volitelné)
                        </Label>
                        <Textarea
                          placeholder="Přidejte poznámky k tomuto cviku..."
                          value={exercise.notes}
                          onChange={(e: { target: { value: string } }) =>
                            updateExercise(exercise.id, "notes", e.target.value)
                          }
                          className="min-h-[60px] resize-none"
                        />
                      </div>
                      <Button
                        onClick={addExercise}
                        variant="outline"
                        size="xs"
                        className="absolute bottom-1.5 right-4"
                      >
                        <Plus className="mr-1" />
                        Další cvik
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {training.exercises.length === 0 && (
                <div className="text-center py-8 text-muted-foreground border rounded-lg">
                  <p>Zatím nebyly přidány žádné cviky.</p>
                  <p className="text-sm">
                    Klikněte na "Přidat cvik" pro začátek.
                  </p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <Separator />

        <DialogFooter className="flex-col sm:flex-row gap-4 mt-auto">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="w-full sm:w-auto bg-transparent"
          >
            Zrušit
          </Button>
          <Button
            onClick={handleSave}
            className="w-full sm:w-auto"
            disabled={!isValidTraining()}
          >
            Uložit trénink
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewTraining;
