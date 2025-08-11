import { Progress } from "@/components/ui/progress.tsx";

interface PowerliftingGoalProps {
  title: string;
  goal: string;
  value: number;
}

const PowerliftingGoal = ({ title, goal, value }: PowerliftingGoalProps) => {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <p>
          {title} ({goal}kg)
        </p>
        <p>{value}%</p>
      </div>

      <Progress value={value} />
    </div>
  );
};

export default PowerliftingGoal;
