import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {cn} from "@/lib/utils.ts";
import type React from "react";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col w-[min(480px,90%)] gap-6 m", className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl md:text-2xl">
            Vytvořit účet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6 te">
              <div className="grid gap-3">
                <Label className="text-base" htmlFor="username">
                  Uživatelské jméno
                </Label>
                <Input id="username" type="text" required />
              </div>
              <div className="grid gap-3 mb-3">
                <Label className="text-base" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label className="text-base" htmlFor="password">
                  Heslo (min. 8 znaků)
                </Label>
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full text-base cursor-pointer"
                >
                  Vytvořit účet
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              <a href="/login" className="underline underline-offset-4">
                Zpět na přihlášení
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
