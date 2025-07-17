import type React from "react";
import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

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

interface TrainingContextType {
  trainings: TrainingObj[];
  exercices: ExcercisesProp[];
  cvik: string;
  setTrainings: React.Dispatch<React.SetStateAction<TrainingObj[]>>;
  setExercices: React.Dispatch<React.SetStateAction<ExcercisesProp[]>>;
  setCvik: React.Dispatch<React.SetStateAction<string>>;
}

const TrainingContext = createContext<TrainingContextType | undefined>(
  undefined,
);

export const useTrainingContext = () => {
  const context = useContext(TrainingContext);
  if (!context) {
    throw new Error(
      "useTrainingContext must be used within a TrainingProvider",
    );
  }
  return context;
};

export const TrainingProvider = ({ children }: PropsWithChildren) => {
  const [trainings, setTrainings] = useState<TrainingObj[]>([]);
  const [exercices, setExercices] = useState<ExcercisesProp[]>([]);
  const [cvik, setCvik] = useState<string>("");

  return (
    <TrainingContext.Provider
      value={{
        trainings,
        exercices,
        cvik,
        setTrainings,
        setExercices,
        setCvik,
      }}
    >
      {children}
    </TrainingContext.Provider>
  );
};
