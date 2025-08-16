import { Badge } from "@/components/ui/badge.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import type { Exercise } from "@/utils/types/trainingsTypes";

interface Props {
  exercise: Exercise;
}

const CalendarTrainingLi = ({ exercise }: Props) => {
  return (
    <div key={exercise.id} className="border rounded-lg p-3 space-y-3">
      <div className="flex justify-between">
        <h4 className="font-semibold text-lg">{exercise?.exercise?.name}</h4>
        <Badge variant="outline">
          {exercise?.exercise?.muscleGroup?.muscleGroup}
        </Badge>
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
