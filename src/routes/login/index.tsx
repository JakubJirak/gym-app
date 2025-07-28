import { LoginForm } from "@/components/login/LoginForm.tsx";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login/")({
  beforeLoad: ({ context }) => {
    if (context.session) {
      throw redirect({
        to: "/menu",
      });
    }
  },
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Přihásit se | GYM APPLICATION" },
      { name: "description", content: "Formulář pro přihlášení uživatele" },
    ],
  }),
});

function RouteComponent() {
  return (
    <div className="flex mt-10 items-center justify-center">
      <LoginForm />
    </div>
  );
}
