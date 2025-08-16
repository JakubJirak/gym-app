import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { deleteTraining } from "@/utils/serverFn/trainings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaRegTrashCan } from "react-icons/fa6";

interface DialogDeleteTraining {
  id: string;
}

const DialogDeleteTraining = ({ id }: DialogDeleteTraining) => {
  const queryClient = useQueryClient();

  const deleteTrainingMutation = useMutation({
    mutationFn: deleteTraining,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
    onError: (error) => console.log(error),
  });

  function handleDeleteTraining(id: string) {
    deleteTrainingMutation.mutate({
      data: { trainingId: id },
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <FaRegTrashCan />
          Vymazat trénink
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Jste si opravdu jistí?</AlertDialogTitle>
          <AlertDialogDescription>
            Tato akce se nedá navrátit. Navždy smaže váš trénink se všemi cviky,
            sériemi a poznámkami.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Zrušit</AlertDialogCancel>
          <AlertDialogAction asChild onClick={() => handleDeleteTraining(id)}>
            <Button className="text-foreground" variant="destructive">
              Smazat
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogDeleteTraining;
