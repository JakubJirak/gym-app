import { Badge } from "@/components/ui/badge.tsx";
import { formatSetInfo } from "@/utils/training-format-utils";
import type { Exercise } from "@/utils/types/trainingsTypes";
import { Separator } from "../ui/separator";

interface Props {
  exercise: Exercise;
  index: number;
  len: number;
}

const CalendarTrainingLi = ({ exercise, index, len }: Props) => {
  return (
    <div key={exercise.id} className="rounded-lg mt-2 space-y-3">
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
              <span className="text-sm flex-1">{setIndex + 1}. série</span>
              <span className="text-sm font-medium mr-2">
                {formatSetInfo(set)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {exercise.note && (
        <p className="text-sm text-muted-foreground">{exercise.note}</p>
      )}
      {index !== len - 1 && <Separator />}
    </div>
  );
};

export default CalendarTrainingLi;
