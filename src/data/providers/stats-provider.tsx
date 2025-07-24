import type React from "react";
import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

interface StatsContextType {
  allWorkouts: number;
  allExercises: number;
  allSets: number;
  setAllWorkouts: React.Dispatch<React.SetStateAction<number>>;
  setAllExercises: React.Dispatch<React.SetStateAction<number>>;
  setAllSets: React.Dispatch<React.SetStateAction<number>>;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const useStatsContext = () => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error("useStatsContext must be used within a StatsProvider");
  }
  return context;
};

export const StatsProvider = ({ children }: PropsWithChildren) => {
  const [allWorkouts, setAllWorkouts] = useState<number>(0);
  const [allExercises, setAllExercises] = useState<number>(0);
  const [allSets, setAllSets] = useState<number>(0);

  return (
    <StatsContext.Provider
      value={{
        allWorkouts,
        allExercises,
        allSets,
        setAllWorkouts,
        setAllExercises,
        setAllSets,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
};
