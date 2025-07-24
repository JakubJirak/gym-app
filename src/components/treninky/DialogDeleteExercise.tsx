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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FaRegTrashCan } from "react-icons/fa6";

interface DialogDeleteTraining {
  handleDeleteExercise: (id: string) => void;
  id: string;
}

const DialogDeleteTraining = ({
  handleDeleteExercise,
  id,
}: DialogDeleteTraining) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon-xs" className="mr-auto ml-2">
          <FaRegTrashCan />
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
          <AlertDialogAction asChild onClick={() => handleDeleteExercise(id)}>
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
