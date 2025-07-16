import TrainingsExcerciceRow from "@/components/treninky/TrainingsListComp/TrainingsExerciceRow.tsx";
import {Card} from "@/components/ui/card.tsx";

interface Set {
  weight: number;
  reps: number;
}

interface ExcerciceProps {
  number: number;
  title: string;
  sets: Set[];
}

const TrainingsExcercice = ({ number, title, sets }: ExcerciceProps) => {
  return (
    <Card className="bg-secondary grid items-center px-4 py-3 gap-1">
      <TrainingsExcerciceRow
        number={number}
        title={title}
        weight={sets[0].weight}
        reps={sets[0].reps}
      />

      {sets.length > 1 &&
        sets.map((set, index) => {
          if (index !== 0)
            return (
              <TrainingsExcerciceRow
                key={set.reps}
                number={0}
                title=""
                weight={set.weight}
                reps={set.reps}
              />
            );
        })}
    </Card>
  );
};

export default TrainingsExcercice;
