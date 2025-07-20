import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { authClient } from "@/lib/auth-client.ts";
import { cn } from "@/lib/utils.ts";
import type React from "react";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const validateSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/menu",
        rememberMe: true,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          console.log("logged");
          setLoading(false);
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setLoading(false);
        },
      },
    );
  };

  return (
    <div
      className={cn("flex flex-col w-[min(480px,90%)] gap-6", className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl md:text-2xl">
            Přihlásit se
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={validateSignIn}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label className="text-base" htmlFor="email">
                  Email
                </Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full text-base cursor-pointer"
                >
                  {loading ? "Načítání" : "Přihlásit se"}
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
          {error !== "" && (
            <p className="text-center mt-5 text-destructive-foreground">
              {error}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
