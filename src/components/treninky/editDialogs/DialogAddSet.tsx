import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface DialogEditSet {
  order: number;
  handleAddSet: (
    exId: string,
    order: number,
    addSetWeight: string,
    addSetReps: string,
  ) => void;
  exId: string;
  setOpenParent: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DialogAddSet({
  order,
  handleAddSet,
  exId,
  setOpenParent,
}: DialogEditSet) {
  const [open, setOpen] = useState<boolean>(false);
  const [addSetWeight, setAddSetWeight] = useState<string>("");
  const [addSetReps, setAddSetReps] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddSet(exId, order, addSetWeight, addSetReps);
    setOpen(false);
    setAddSetWeight("");
    setAddSetReps("");
    setOpenParent(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-40">
            <Plus className="size-5" />
            Přidat sérii
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] h-auto">
          <DialogHeader>
            <DialogTitle>Přidání série</DialogTitle>
            <DialogDescription>
              Zde můžete přidat sérii k vybranému cviku.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-1">
              <div className="grid gap-3">
                <Label htmlFor="vaha">Váha (kg)</Label>
                <Input
                  value={addSetWeight}
                  onChange={(e) => setAddSetWeight(e.target.value)}
                  id="vaha"
                  name="vaha"
                  type="number"
                  min={1}
                  step={0.01}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="opak">Počet opakování</Label>
                <Input
                  value={addSetReps}
                  onChange={(e) => setAddSetReps(e.target.value)}
                  id="opak"
                  name="opak"
                  type="number"
                  min={1}
                  step={0.01}
                  required
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Zrušit</Button>
              </DialogClose>
              <Button type="submit">Uložit změny</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
}
