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
  exName: string;
  setExName: React.Dispatch<React.SetStateAction<string>>;
  handleAddExercise: (exN: string) => void;
}

export function AddExercise({
  exName,
  setExName,
  handleAddExercise,
}: DialogEditSet) {
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddExercise(exName);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button>
            <Plus className="" />
            Přidat cvik
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] h-auto">
          <DialogHeader>
            <DialogTitle>Přidat vlastní cvik</DialogTitle>
            <DialogDescription>
              Zde si můžete přidat vlastní cvik.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="cvik">Jméno cviku</Label>
                <Input
                  placeholder="Název cviku"
                  value={exName}
                  onChange={(e) => setExName(e.target.value)}
                  id="cvik"
                  name="cvik"
                  type="text"
                  required
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Zrušit</Button>
              </DialogClose>
              <Button type="submit">Uložit cvik</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
}
