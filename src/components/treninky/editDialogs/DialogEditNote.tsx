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
import { editNote } from "@/utils/serverFn/trainings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface DialogEditSet {
  exerciseId: string;
  setOpenParent: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DialogEditNote({ exerciseId, setOpenParent }: DialogEditSet) {
  const [open, setOpen] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const queryClient = useQueryClient();

  const editNoteMutation = useMutation({
    mutationFn: editNote,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
    onError: (error) => console.log(error),
  });

  function handleEditNote(id: string, note: string) {
    editNoteMutation.mutate({
      data: {
        exId: id,
        note,
      },
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleEditNote(exerciseId, note);
    setOpenParent(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-40">
            <Pencil className="size-4" />
            Upravit pozn.
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] h-auto">
          <DialogHeader>
            <DialogTitle>Změna poznámky</DialogTitle>
            <DialogDescription>
              Zde můžete změnit poznámku ke cviku, odesláním prázdné poznámky se
              smaže.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
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
