import type { SetType } from "@/utils/types/trainingsTypes.ts";

export const formatSetInfo = (set: SetType) => {
  const parts = [];
  if (set.weight) parts.push(`${set.weight}kg`);
  if (set.reps) parts.push(`${set.reps}`);
  return parts.join(" × ") || "Prázdná série";
};
