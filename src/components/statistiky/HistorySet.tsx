import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

type sets = {
  id: string;
  order: number | null;
  workoutExerciseId: string | null;
  weight: string | null;
  reps: number | null;
}[];

interface HistorySetProps {
  date?: string;
  sets?: sets;
}

const HistorySet = ({ date, sets }: HistorySetProps) => {
  if (!date || !sets) return <p>Pro tento cvik nemate zadnou serii</p>;

  const d = new Date(date);

  return (
    <Card className="py-4">
      <CardHeader className="px-4">
        <CardTitle>{d.toLocaleDateString()}</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <div className="space-y-2 mt-[-16px]">
          {sets.map((set) => (
            <div
              key={set.id}
              className="p-2 px-3 bg-secondary rounded-xl flex gap-0.5"
            >
              <p>{set.order ? set.order + 1 : 1}. serie</p>
              <p className="ml-auto font-bold">{set.weight}</p>
              <p className="font-bold">×</p>
              <p className="font-bold">{set.reps}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HistorySet;
