import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface DialogEditSet {
  addSetWeight: string;
  addSetReps: string;
  setAddSetWeight: React.Dispatch<React.SetStateAction<string>>;
  setAddSetReps: React.Dispatch<React.SetStateAction<string>>;
  order: number;
  handleAddSet: (exId: string, order: number) => void;
  exId: string;
}

export function DialogAddSet({
  addSetWeight,
  addSetReps,
  setAddSetWeight,
  setAddSetReps,
  order,
  handleAddSet,
  exId,
}: DialogEditSet) {
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddSet(exId, order);
    setOpen(false);
    setAddSetWeight("");
    setAddSetReps("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon-xs">
            <Plus className="h-3 w-3" />
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
