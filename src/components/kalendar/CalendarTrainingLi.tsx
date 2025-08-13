import { Badge } from "@/components/ui/badge.tsx";
import { Separator } from "@/components/ui/separator.tsx";

interface Props {
  exercise: {
    id: string;
    note: string | null;
    workoutId: string | null;
    exerciseId: string | null;
    order: number | null;
    exercise: {
      id: string;
      name: string;
    } | null;
    sets: {
      id: string;
      order: number | null;
      workoutExerciseId: string | null;
      weight: string | null;
      reps: number | null;
    }[];
  };
}

const CalendarTrainingLi = ({ exercise }: Props) => {
  return (
    <div key={exercise.id} className="border rounded-lg p-3 space-y-3">
      <div className="flex justify-between">
        <h4 className="font-semibold text-lg">{exercise?.exercise?.name}</h4>
        <Badge variant="outline">Série: {exercise.sets.length}</Badge>
      </div>

      <div>
        <div className="grid gap-2">
          {exercise.sets.map((set, setIndex) => (
            <div
              key={set.id}
              className="flex items-center bg-secondary rounded-md py-2 px-3"
            >
              <span className="text-sm font-medium flex-1">
                {setIndex + 1}. série
              </span>
            </div>
          ))}
        </div>
      </div>
      {exercise.note && <Separator />}
      {exercise.note && (
        <p className="text-sm text-muted-foreground">{exercise.note}</p>
      )}
    </div>
  );
};

export default CalendarTrainingLi;
