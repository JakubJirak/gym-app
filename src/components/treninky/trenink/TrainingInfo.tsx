import TrainingLi from "@/components/treninky/TrainingLi.tsx";
import { DialogAddExercise } from "@/components/treninky/editDialogs/DialogAddExercise.tsx";
import DialogDelete from "@/components/treninky/editDialogs/DialogDeleteTraining.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Toggle } from "@/components/ui/toggle.tsx";
import { authClient } from "@/lib/auth-client.ts";
import { formatDate } from "@/utils/date-utils.ts";
import { getExById } from "@/utils/serverFn/trainings.ts";
import { formatSetInfo } from "@/utils/training-format-utils.ts";
import type {
  ExerciseSelectWithID,
  TrainingsByIdType,
} from "@/utils/types/trainingsTypes.ts";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

interface TrainingInfoProps {
  trainingArr: TrainingsByIdType;
}

const TrainingInfo = ({ trainingArr }: TrainingInfoProps) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const training = trainingArr[0];
  const { data: session } = authClient.useSession();

  const { data: defaultExercises } = useQuery({
    queryKey: ["defaultExercises"],
    queryFn: () => getExById({ data: { userId: "default" } }),
    enabled: !!session,
  });

  const { data: customExercises } = useQuery({
    queryKey: ["customExercises", session?.user.id],
    queryFn: () => getExById({ data: { userId: session?.user.id ?? "" } }),
    enabled: !!session,
  });

  const exercises: ExerciseSelectWithID[] = [
    ...(customExercises ?? []),
    ...(defaultExercises ?? []),
  ];

  return (
    <div>
      <div className="w-full flex justify-between items-center mb-2">
        <div className="flex col-span-2 items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {formatDate(new Date(training.workoutDate), "PPPP")}
        </div>
        <Badge variant="secondary">
          Cviky: {training.workoutExercises.length}
        </Badge>
      </div>

      <div className="flex flex-col items-stretch relative">
        {training.workoutExercises.map((exercise, index) => (
          <TrainingLi
            key={exercise.id}
            exercise={exercise}
            formatSetInfo={formatSetInfo}
            toggleEdit={toggleEdit}
            exercises={exercises}
            index={index}
            len={training.workoutExercises.length}
          />
        ))}
        <div className="space-y-2 mt-5">
          <div className={`${toggleEdit ? "" : "hidden"}`}>
            <DialogAddExercise
              exercises={exercises}
              trainingId={training.id}
              order={training.workoutExercises.length}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="">
              <Toggle
                variant="outline"
                onClick={() => setToggleEdit(!toggleEdit)}
              >
                <FaPencilAlt /> Upravit
              </Toggle>
            </div>
            <div className="inline-flex self-end">
              <DialogDelete id={training.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingInfo;
