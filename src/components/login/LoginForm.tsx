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
import { useForm } from "@tanstack/react-form";
import type React from "react";
import { useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email("Zadejte platný email").min(1, "Zadejte email"),
  password: z.string().min(1, "Zadejte heslo"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [error, setError] = useState<string>("");

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
          callbackURL: "/menu",
          rememberMe: true,
        },
        {
          onError: (ctx) => {
            setError(ctx.error.message);
          },
        },
      );
    },
  });

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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="flex flex-col gap-6">
              <form.Field name="email">
                {(field) => (
                  <div className="grid gap-2">
                    <Label className="text-base" htmlFor={field.name}>
                      Email
                    </Label>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                    {field.state.meta.isTouched && !field.state.meta.isValid ? (
                      <p className="text-sm text-destructive-foreground">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>
              <form.Field name="password">
                {(field) => (
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label className="text-base" htmlFor={field.name}>
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
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      id={field.name}
                      name={field.name}
                      type="password"
                      required
                    />
                    {field.state.meta.isTouched && !field.state.meta.isValid ? (
                      <p className="text-sm text-destructive-foreground">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <div className="flex flex-col gap-3">
                    <Button
                      type="submit"
                      className="w-full text-base cursor-pointer"
                      disabled={!canSubmit}
                    >
                      {isSubmitting ? "Přihlašování..." : "Přihlásit se"}
                    </Button>
                  </div>
                )}
              </form.Subscribe>
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
