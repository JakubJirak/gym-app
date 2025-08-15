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
import { linkOptions, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import type React from "react";
import { z } from "zod";

const registerSchema = z
  .object({
    name: z.string().min(1, "Zadejte svoje jméno"),
    email: z.email("Zadejte platný email").min(1, "Zadejte email"),
    password: z.string().min(8, "Heslo musí mít alespoň 8 znamků"),
    confirmPassword: z.string().min(8, "Potvrďte svoje heslo"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hesla se neshodují",
    path: ["confirmPassword"],
  });

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: registerSchema,
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(
        {
          name: value.name,
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: async () => {
            await router.invalidate();
            router.navigate({ to: linkOptions({ to: "/login" }).to });
          },
          onError: (ctx) => {
            setError(ctx.error.message);
          },
        },
      );
    },
  });

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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="flex flex-col gap-6">
              <form.Field name="name">
                {(field) => (
                  <div className="grid gap-2">
                    <Label className="text-base" htmlFor={field.name}>
                      Uživatelské jméno
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
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
              <form.Field name="email">
                {(field) => (
                  <div className="grid gap-2">
                    <Label className="text-base" htmlFor={field.name}>
                      Email
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
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
                    <Label className="text-base" htmlFor={field.name}>
                      Heslo
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
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
              <form.Field name="confirmPassword">
                {(field) => (
                  <div className="grid gap-2">
                    <Label className="text-base" htmlFor={field.name}>
                      Potvrdte svoje heslo
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
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
                  <div className="flex flex-col gap-2">
                    <Button
                      type="submit"
                      className="w-full text-base cursor-pointer"
                      disabled={!canSubmit}
                    >
                      {isSubmitting ? "Vytváření účtu..." : "Vytvořit účet"}
                    </Button>
                  </div>
                )}
              </form.Subscribe>
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
