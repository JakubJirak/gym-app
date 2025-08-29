import PowerliftingGoal from "@/components/powerlifting/PowerliftingGoal.tsx";
import { db } from "@/db";
import { userGoals } from "@/db/schema.ts";
import { authClient } from "@/lib/auth-client.ts";
import { useQuery } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { Target } from "lucide-react";

const getGoals = createServerFn({ method: "GET" })
  .validator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    return db.select().from(userGoals).where(eq(userGoals.userId, data.userId));
  });

interface PowerflitingStatsType {
  benchPR: number;
  deadliftPR: number;
  squatPR: number;
}

const PowerliftingGoals = ({
  benchPR,
  squatPR,
  deadliftPR,
}: PowerflitingStatsType) => {
  const { data: session } = authClient.useSession();

  const { data: goals } = useQuery({
    queryKey: ["userGoals", session?.user.id ?? ""],
    queryFn: () => getGoals({ data: { userId: session?.user.id ?? "" } }),
    enabled: !!session,
  });

  if (!goals || goals.length === 0) return null;

  return (
    <div className="p-4">
      <h2 className="flex gap-3 items-center text-lg font-bold mb-4">
        <Target />
        Vaše PR cíle
      </h2>

      <div>
        <div className="space-y-7">
          <PowerliftingGoal
            title="Squat"
            goal={goals[0].squat ?? ""}
            value={Number(
              ((squatPR / Number(goals[0].squat)) * 100).toFixed(0),
            )}
          />
          <PowerliftingGoal
            title="Bench"
            goal={goals[0].bench ?? ""}
            value={Number(
              ((benchPR / Number(goals[0].bench)) * 100).toFixed(0),
            )}
          />
          <PowerliftingGoal
            title="Deadlift"
            goal={goals[0].deadlift ?? ""}
            value={Number(
              ((deadliftPR / Number(goals[0].deadlift)) * 100).toFixed(0),
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default PowerliftingGoals;
