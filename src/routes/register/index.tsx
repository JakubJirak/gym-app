import { RegisterForm } from "@/components/register/RegisterForm.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Vytvoření účtu | GYM APPLICATION" },
      { name: "description", content: "Formulář pro vytvoření nového účtu" },
    ],
  }),
});

function RouteComponent() {
  return (
    <div className="flex mt-10 items-center justify-center">
      <RegisterForm />
    </div>
  );
}
