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
import { useState } from "react";
import type React from "react";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [error, setError] = useState("");

  const validateSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          alert("Ucet vytvoren!");
          setLoading(false);
          setCreated(true);
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setLoading(false);
        },
      },
    );
  };

  if (created) return <p>Ucet vytvoren</p>;

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
          <form onSubmit={validateSignUp}>
            <div className="flex flex-col gap-6 te">
              <div className="grid gap-3">
                <Label className="text-base" htmlFor="username">
                  Uživatelské jméno
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="username"
                  type="text"
                  required
                />
              </div>
              <div className="grid gap-3 mb-3">
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
                <Label className="text-base" htmlFor="password">
                  Heslo (min. 8 znaků)
                </Label>
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
                  {loading ? "Načítání" : "Vytvořit účet"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              <a href="/login" className="underline underline-offset-4">
                Zpět na přihlášení
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
