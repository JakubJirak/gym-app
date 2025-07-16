import ExcerciceRow from "@/components/treninky/ExcerciceRow.tsx";
import ExcerciceRowInputs from "@/components/treninky/ExcerciceRowInputs.tsx";
import type React from "react";
import {useState} from "react";
import {Card} from "../ui/card";

interface Set {
  weight: number;
  reps: number;
}

interface TrainingProp {
  name: string;
  sets: Set[];
}

interface ExcerciceProps {
  number: number;
  title: string;
  sets: Set[];
  index: number;
  trainings: TrainingProp[];
  setTrainings: React.Dispatch<React.SetStateAction<TrainingProp[]>>;
}

const Excercice = ({
  number,
  title,
  sets,
  index,
  trainings,
  setTrainings,
}: ExcerciceProps) => {
  const [showInputs, setShowInputs] = useState<boolean>(false);
  const [vaha, setVaha] = useState<string>("");
  const [opak, setOpak] = useState<string>("");

  return (
    <Card className="bg-secondary grid items-center px-4 py-3 gap-1">
      <ExcerciceRow
        number={number}
        title={title}
        weight={sets[0].weight}
        reps={sets[0].reps}
        showPlus={!showInputs && sets.length === 1}
        setShowInputs={setShowInputs}
      />

      {sets.length > 1 &&
        sets.map((set, index) => {
          if (index !== 0)
            return (
              <ExcerciceRow
                key={set.reps}
                number={0}
                title=""
                weight={set.weight}
                reps={set.reps}
                showPlus={!showInputs && index + 1 === sets.length}
                setShowInputs={setShowInputs}
              />
            );
        })}
      {showInputs && (
        <ExcerciceRowInputs
          vaha={vaha}
          opak={opak}
          trainings={trainings}
          index={index}
          setVaha={setVaha}
          setOpak={setOpak}
          setTrainings={setTrainings}
          setShowInputs={setShowInputs}
        />
      )}
    </Card>
  );
};

export default Excercice;
