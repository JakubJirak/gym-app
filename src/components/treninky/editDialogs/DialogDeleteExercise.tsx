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
import type React from "react";
import { FaRegTrashCan } from "react-icons/fa6";

interface DialogDeleteTraining {
  handleDeleteExercise: (id: string) => void;
  id: string;
  setOpenParent: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogDeleteTraining = ({
  handleDeleteExercise,
  id,
  setOpenParent,
}: DialogDeleteTraining) => {
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
