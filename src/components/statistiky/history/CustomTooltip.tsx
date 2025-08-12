import type { TooltipProps } from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) {
  if (active && payload && payload.length) {
    const d = new Date(label);
    return (
      <div className="p-3 bg-background flex flex-col gap-1 items-center justify-center border border-border rounded-xl">
        <p className="font-semibold">{d.toLocaleDateString()}</p>
        <div className="flex gap-0.5">
          <p className="ml-auto font-bold">{payload[0].value}kg</p>
          <p className="font-bold">×</p>
          <p className="font-bold">{payload[0].payload.reps}</p>
        </div>
      </div>
    );
  }
  return null;
}
