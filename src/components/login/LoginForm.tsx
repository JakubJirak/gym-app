import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {cn} from "@/lib/utils.ts";
import type React from "react";

export function LoginForm({
                            className,
                            ...props
                          }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col w-[min(500px,90%)] gap-6", className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl md:text-2xl">
            Přihlásit se
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
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
                <div className="flex items-center">
                  <Label className="text-base" htmlFor="password">
                    Heslo
                  </Label>
                  <a
                    href="/login"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Obnovit heslo
                  </a>
                </div>
                <Input id="password" type="password" required/>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full text-base">
                  Přihlásit se
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Nemáte účet?{" "}
              <a href="/register" className="underline underline-offset-4">
                Vytvořte si účet
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
