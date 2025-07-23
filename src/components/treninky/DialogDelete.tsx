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

interface DialogDelete {
  handleDeleteTraining: (id: string) => void;
  id: string;
}

const DialogDelete = ({ handleDeleteTraining, id }: DialogDelete) => {
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
            Tato akce se nedá navrátit. Navždy smaže váš trénink.
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

export default DialogDelete;
