import { Badge } from "@/components/ui/badge.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { db } from "@/db";
import { userWeight } from "@/db/schema.ts";
import { authClient } from "@/lib/auth-client.ts";
import { useQuery } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { Trophy } from "lucide-react";

interface PowerflitingStatsType {
  benchPR: number;
  deadliftPR: number;
  squatPR: number;
}

const fetchWeight = createServerFn({ method: "GET" })
  .validator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    return db
      .select()
      .from(userWeight)
      .where(eq(userWeight.userId, data.userId));
  });

const PowerliftingStats = ({
  benchPR,
  squatPR,
  deadliftPR,
}: PowerflitingStatsType) => {
  const { data: session } = authClient.useSession();
  const { data: weightData } = useQuery({
    queryKey: ["userWeight", session?.user.id],
    queryFn: () => fetchWeight({ data: { userId: session?.user.id ?? "" } }),
    enabled: !!session,
  });

  const total = squatPR + deadliftPR + benchPR;

  if (total === 0) return null;

  return (
    <div className="p-2 -mt-2">
      <div className="mb-6">
        <h2 className="flex gap-3 items-center text-lg font-bold mb-1.5">
          <Trophy />
          Powerlifting PR
        </h2>
        <p className="text-muted-foreground text-sm">
          {weightData === undefined || weightData.length === 0
            ? "Zadejte svoji váhu v profilu"
            : `${weightData[0].weight}kg BW`}
        </p>
      </div>
      <div>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-1">
            <div className="flex flex-col justify-center items-center gap-1">
              <p className="text-lg sm:text-xl font-bold">{squatPR}kg</p>
              <p className="text-muted-foreground text-sm sm:text-base mb-1">
                Squat
              </p>
              {weightData === undefined || weightData.length === 0 ? null : (
                <Badge variant="secondary" className="text-xs sm:text-base">
                  {(squatPR / Number(weightData[0].weight)).toFixed(2)}x BW
                </Badge>
              )}
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <p className="text-lg sm:text-xl font-bold">{benchPR}kg</p>
              <p className="text-muted-foreground text-center text-sm sm:text-base mb-1">
                Bench Press
              </p>
              {weightData === undefined || weightData.length === 0 ? null : (
                <Badge variant="secondary" className="text-xs sm:text-base">
                  {(benchPR / Number(weightData[0].weight)).toFixed(2)}x BW
                </Badge>
              )}
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <p className="text-lg sm:text-xl font-bold">{deadliftPR}kg</p>
              <p className="text-muted-foreground text-center text-sm sm:text-base mb-1">
                Deadlift
              </p>
              {weightData === undefined || weightData.length === 0 ? null : (
                <Badge variant="secondary" className="text-xs sm:text-base">
                  {(deadliftPR / Number(weightData[0].weight)).toFixed(2)}x BW
                </Badge>
              )}
            </div>
          </div>
          <Separator />
          <div className="">
            <div className="space-y-2 grid gap-5">
              <div className="flex flex-col justify-center items-center gap-1">
                <p className="text-center text-2xl font-bold">{total}kg</p>
                <p className="text-muted-foreground">Total</p>
                {weightData === undefined || weightData.length === 0 ? null : (
                  <Badge variant="accent" className="text-xs sm:text-base">
                    {(total / Number(weightData[0].weight)).toFixed(2)}x BW
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerliftingStats;
