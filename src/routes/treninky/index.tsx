import Header from "@/components/Header.tsx";
import AddTraining from "@/components/treninky/AddTraining";
import Training from "@/components/treninky/Training.tsx";
import {createFileRoute} from "@tanstack/react-router";
import {useState} from "react";

export const Route = createFileRoute("/treninky/")({
  component: RouteComponent,
});

interface Set {
  weight: number;
  reps: number;
}

interface ExcercisesProp {
  name: string;
  sets: Set[];
}

type TrainingObj = {
  name: string;
  date: string;
  excercises: ExcercisesProp[];
};

function RouteComponent() {
  const [training, setTraining] = useState<TrainingObj[]>();

  return (
    <div>
      <Header page="TRÉNINKY" />
      <AddTraining training={training} setTraining={setTraining} />
      <div className="w-[90%] max-w-[500px] mx-auto gap-4 flex flex-col justify-center mt-4">
        <Training training={training} />
      </div>
    </div>
  );
}
