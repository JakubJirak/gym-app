import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Excercice from "./Excercice";

const AddTraining = () => {
  return (
    <div className="max-w-[500px] flex flex-col mx-auto">
      <Dialog>
        <DialogTrigger>
          <Button className="w-auto ml-auto mr-6">Přidat trénink</Button>
        </DialogTrigger>
        <DialogContent className="p-5">
          <DialogHeader>
            <DialogTitle className="text-xl mb-4">Přidání tréninku</DialogTitle>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Název tréninku</Label>
                <Input type="text" id="name-1" name="training" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Datum</Label>
                <Input type="text" id="username-1" name="date" />
              </div>
            </div>
            <div className="">
              <DialogTitle className="text-xl mb-4 text-left">
                Cviky
              </DialogTitle>
            </div>
            <div className="flex flex-col gap-3">
              <Excercice number={1} title="Dřep" weight={172.5} reps={10} />
              <Excercice number={2} title="Dřep" weight={500} reps={10} />
              <Excercice number={3} title="Dřep" weight={80} reps={10} />
              <Excercice number={4} title="Dřep" weight={80} reps={10} />
            </div>
            <DialogClose className="inline-flex mt-auto">
              <Button className="w-auto ml-auto">Přidat trénink</Button>
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddTraining;
