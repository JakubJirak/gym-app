import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import type { TrainingsType } from "@/routes/statistiky";

interface OverallStatsType {
  trainings: TrainingsType;
}

const OverallStats = ({ trainings }: OverallStatsType) => {
  const allExercises = trainings?.reduce(
    (acc, training) => acc + training.workoutExercises.length,
    0,
  );

  const allSets = trainings?.reduce(
    (acc, training) =>
      acc +
      training.workoutExercises.reduce(
        (exAcc, exercise) => exAcc + exercise.sets.length,
        0,
      ),
    0,
  );

  const allWeight = trainings?.reduce(
    (acc, training) =>
      acc +
      training.workoutExercises.reduce(
        (exAcc, exercise) =>
          exAcc +
          exercise.sets.reduce(
            (setAcc, set) => setAcc + Number(set.weight ?? 0) * (set.reps ?? 0),
            0,
          ),
        0,
      ),
    0,
  );

  const allReps = trainings?.reduce(
    (acc, training) =>
      acc +
      training.workoutExercises.reduce(
        (exAcc, exercise) =>
          exAcc +
          exercise.sets.reduce(
            (setAcc, set) => setAcc + Number(set.reps ?? 0),
            0,
          ),
        0,
      ),
    0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Celkové statistiky</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <p className="text-muted-foreground">Počet všech tréninků</p>
            <p>{trainings?.length}</p>
          </div>
          <Separator />
          <div>
            <p className="text-muted-foreground">Počet všech cviků</p>
            <p>{allExercises}</p>
          </div>
          <Separator />
          <div>
            <p className="text-muted-foreground">Počet všech sérií</p>
            <p>{allSets}</p>
          </div>
          <Separator />
          <div>
            <p className="text-muted-foreground">Celková zvednutá váha</p>
            <p>{allWeight}kg</p>
          </div>
          <Separator />
          <div>
            <p className="text-muted-foreground">Celkový počet opakování</p>
            <p>{allReps}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverallStats;
