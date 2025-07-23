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
import type React from "react";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

interface DialogEditSet {
  repsBefore: number | null;
  weightBefore: string | null;
  setId: string;
  handleDeleteSet: (id: string) => void;
  editSetWeight: string;
  editSetReps: string;
  setEditSetWeight: React.Dispatch<React.SetStateAction<string>>;
  setEditSetReps: React.Dispatch<React.SetStateAction<string>>;
  handleEditSet: (id: string) => void;
}

export function DialogEditSet({
  repsBefore,
  weightBefore,
  setId,
  handleDeleteSet,
  editSetWeight,
  editSetReps,
  setEditSetWeight,
  setEditSetReps,
  handleEditSet,
}: DialogEditSet) {
  const [open, setOpen] = useState<boolean>(false);

  if (!repsBefore || !weightBefore) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleEditSet(setId);
    setOpen(false);
    setEditSetWeight("");
    setEditSetReps("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon-sm">
            <FaPencilAlt />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] h-auto">
          <DialogHeader>
            <DialogTitle>Změna série</DialogTitle>
            <DialogDescription>
              Zde můžete změnit váhu nebo počet opakování v sérii.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="vaha">Váha (kg)</Label>
                <Input
                  value={editSetWeight}
                  onChange={(e) => setEditSetWeight(e.target.value)}
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
                  value={editSetReps}
                  onChange={(e) => setEditSetReps(e.target.value)}
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
              <Button
                variant="destructive"
                className="mr-auto"
                onClick={() => handleDeleteSet(setId)}
                type="button"
              >
                <FaRegTrashCan />
                Odstranit sérii
              </Button>
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
