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
import { deleteExercise } from "@/utils/serverFn/trainings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type React from "react";
import { FaRegTrashCan } from "react-icons/fa6";

interface DialogDeleteTraining {
  id: string;
  setOpenParent: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogDeleteTraining = ({ id, setOpenParent }: DialogDeleteTraining) => {
  const queryClient = useQueryClient();

  const deleteExerciseMutation = useMutation({
    mutationFn: deleteExercise,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
    onError: (error) => console.log(error),
  });

  function handleDeleteExercise(id: string) {
    deleteExerciseMutation.mutate({
      data: { exerciseId: id },
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="mx-auto w-40">
          <FaRegTrashCan className="size-3" />
          Odstranit cvik
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Jste si opravdu jistí?</AlertDialogTitle>
          <AlertDialogDescription>
            Tato akce se nedá navrátit. Navždy smaže váš cvik se všemi sériemi a
            poznámkami.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Zrušit</AlertDialogCancel>
          <AlertDialogAction
            asChild
            onClick={() => {
              handleDeleteExercise(id);
              setOpenParent(false);
            }}
          >
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
