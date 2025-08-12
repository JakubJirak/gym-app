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
      <div className="p-2 bg-accent border border-border rounded-xl">
        <p>{d.toLocaleDateString()}</p>
        <p>Váha: {payload[0].value}kg</p>
        <p>Opak.: {payload[0].payload.reps}x</p>
      </div>
    );
  }
  return null;
}
