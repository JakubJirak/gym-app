import type { TrainingsType } from "@/utils/types/trainingsTypes";
import { BicepsFlexed } from "lucide-react";
import { useMemo } from "react";

interface MuscleGroupStatsType {
  trainings: TrainingsType;
}

const MuscleGroupStats = ({ trainings }: MuscleGroupStatsType) => {
  const muscleGroupCount = useMemo(() => {
    const count = trainings
      .flatMap((t) => t.workoutExercises)
      .reduce<Record<string, number>>((acc, cvik) => {
        const group: string =
          cvik.exercise?.muscleGroup &&
          cvik.exercise.muscleGroup.muscleGroup !== undefined
            ? cvik.exercise.muscleGroup.muscleGroup
            : "";
        acc[group] = (acc[group] || 0) + 1;
        return acc;
      }, {});

    return Object.fromEntries(
      Object.entries(count).sort(([, a], [, b]) => b - a),
    );
  }, [trainings]);

  return (
    <div className="p-1">
      <p className="flex gap-3 items-center text-lg font-bold mb-4">
        <BicepsFlexed />
        Podle partie těla
      </p>
      <div className="grid grid-cols-3 gap-3">
        {Object.entries(muscleGroupCount).map(([group, count]) => (
          <div
            key={group}
            className="flex flex-col items-center py-4 justify-between gap-1 bg-secondary rounded-2xl text-center"
          >
            <p className="mt-1 font-bold text-2xl">{count}</p>
            <p className="text-muted-foreground">{group}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MuscleGroupStats;
