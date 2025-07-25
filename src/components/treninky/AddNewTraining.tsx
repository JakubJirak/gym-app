import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { CalendarIcon, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

import { ExerciseCombobox } from "@/components/treninky/ExerciseCombobox.tsx";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

interface ExerciseOption {
  id: string;
  name: string;
}

export interface Set {
  id: string;
  exerciseId: string;
  reps: string;
  weight: string;
}

export interface Exercise {
  id: string;
  workoutId: string;
  name: string;
  exerciseId: string | null;
  notes: string;
  sets: Set[];
}

export interface Training {
  id: string;
  name: string;
  date: Date;
  exercises: Exercise[];
}

type ExerciseSelect = {
  id: string;
  name: string;
};

interface TrainingDialogProps {
  onSave: (training: Training) => void;
}

const AddNewTraining = ({ onSave }: TrainingDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [training, setTraining] = useState({
    name: "",
    date: undefined as Date | undefined,
    exercises: [] as Exercise[],
  });

  // Ukládání vybraného statusu pro každý cvik zvlášť podle jeho id
  const [selectedStatuses, setSelectedStatuses] = useState<
    Record<string, ExerciseSelect | null>
  >({});
  const [localTrainingId, setLocalTrainingId] = useState<string | null>(null);

  const addExercise = () => {
    let workoutId = localTrainingId;
    if (!workoutId) {
      workoutId = uuidv4();
      setLocalTrainingId(workoutId);
    }
    const exerciseId = uuidv4();
    const newExercise: Exercise = {
      id: exerciseId,
      workoutId: workoutId,
      name: "",
      exerciseId: null,
      notes: "",
      sets: [
        {
          id: uuidv4(),
          exerciseId: exerciseId,
          reps: "",
          weight: "",
        },
      ],
    };
    setTraining((prev) => ({
      ...prev,
      exercises: [...prev.exercises, newExercise],
    }));
    setSelectedStatuses((prev) => ({
      ...prev,
      [exerciseId]: null,
    }));
  };

  const removeExercise = (exerciseId: string | number) => {
    setTraining((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((ex) => ex.id !== exerciseId),
    }));
    setSelectedStatuses((prev) => {
      const newStatuses = { ...prev };
      delete newStatuses[exerciseId.toString()];
      return newStatuses;
    });
  };

  const updateExercise = <K extends keyof Exercise>(
    exerciseId: string | number,
    field: K,
    value: Exercise[K],
  ) => {
    setTraining((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, [field]: value } : ex,
      ),
    }));
  };

  const addSet = (exerciseId: string | number) => {
    setTraining((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: [
                ...ex.sets,
                {
                  id: uuidv4(),
                  exerciseId: ex.id,
                  reps: "",
                  weight: "",
                },
              ],
            }
          : ex,
      ),
    }));
  };

  const removeSet = (exerciseId: string | number, setId: string) => {
    setTraining((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) =>
        ex.id === exerciseId
          ? { ...ex, sets: ex.sets.filter((set) => set.id !== setId) }
          : ex,
      ),
    }));
  };

  const updateSet = <K extends keyof Set>(
    exerciseId: string | number,
    setId: string,
    field: K,
    value: Set[K],
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

  // Nastaví selectedStatus jen pro konkrétní cvik podle id
  const handleSetSelectedStatus = (
    exerciseId: string,
    value: ExerciseSelect | null,
  ) => {
    setSelectedStatuses((prev) => ({
      ...prev,
      [exerciseId]: value,
    }));
  };

  // Při volbě cviku uloží stav pro konkrétní cvik
  const selectExercise = (
    exerciseId: string | number,
    selected: ExerciseOption,
  ) => {
    updateExercise(exerciseId, "name", selected.name);
    updateExercise(exerciseId, "exerciseId", selected.id);
    handleSetSelectedStatus(exerciseId.toString(), selected);
  };

  const isValidTraining = (): boolean => {
    if (
      !training.name.trim() ||
      !training.date ||
      training.exercises.length === 0
    ) {
      return false;
    }
    return training.exercises.every((exercise) => {
      if (!exercise.name.trim() || exercise.exerciseId == null) return false;
      return exercise.sets.some(
        (set) => set.reps.trim() !== "" && set.weight.trim() !== "",
      );
    });
  };

  const handleSave = () => {
    if (!isValidTraining() || !training.date) return;

    let workoutId = localTrainingId;
    if (!workoutId) {
      workoutId = uuidv4();
      setLocalTrainingId(workoutId);
    }

    const exercisesWithIds = training.exercises.map((ex) => {
      const exerciseId = ex.id || uuidv4();
      return {
        ...ex,
        id: exerciseId,
        workoutId,
        sets: ex.sets.map((set) => ({
          ...set,
          exerciseId,
        })),
      };
    });

    const newTraining: Training = {
      id: workoutId,
      name: training.name,
      date: training.date,
      exercises: exercisesWithIds,
    };

    onSave(newTraining);
    setOpen(false);
    setTraining({
      name: "",
      date: undefined,
      exercises: [],
    });
    setSelectedStatuses({});
    setLocalTrainingId(null);
  };

  const handleCancel = () => {
    setOpen(false);
    setTraining({
      name: "",
      date: undefined,
      exercises: [],
    });
    setSelectedStatuses({});
    setLocalTrainingId(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Přidat trénink</Button>
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
            <div className="space-y-2">
              <Label htmlFor="training-name">Název tréninku *</Label>
              <Input
                id="training-name"
                placeholder="Zadejte název tréninku"
                className="placeholder:text-sm text-sm"
                value={training.name}
                onChange={(e) =>
                  setTraining((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
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
                      className="border rounded-lg bg-secondary p-4 space-y-4 relative"
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex-1 space-y-2">
                          <div className="flex w-full">
                            <Label className="text-sm font-medium flex-1">
                              {exerciseIndex + 1}. Cvik
                            </Label>
                            <Button
                              variant="muted"
                              size="icon-sm"
                              onClick={() => removeExercise(exercise.id)}
                              className="shrink-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <ExerciseCombobox
                            selectedStatus={
                              selectedStatuses[exercise.id] ?? null
                            }
                            setSelectedStatus={(value) =>
                              handleSetSelectedStatus(exercise.id, value)
                            }
                            exerciseId={exercise.id}
                            selectExercise={selectExercise}
                          />
                        </div>
                      </div>
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
                                  min={1}
                                  max={10000}
                                  step={0.01}
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
                                  min={1}
                                  max={10000}
                                  step={0.01}
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
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium">
                          Poznámky (volitelné)
                        </Label>
                        <Input
                          placeholder="Přidejte poznámky k tomuto cviku..."
                          value={exercise.notes}
                          className="placeholder:text-sm text-sm"
                          onChange={(e) =>
                            updateExercise(exercise.id, "notes", e.target.value)
                          }
                        />
                        <div className="self-end">
                          <Button
                            onClick={addExercise}
                            variant="outline"
                            className="inline-flex mt-2"
                            size="sm"
                          >
                            <Plus className="mr-1" />
                            Další cvik
                          </Button>
                        </div>
                      </div>
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
