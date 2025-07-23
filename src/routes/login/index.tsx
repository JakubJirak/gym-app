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
});

function RouteComponent() {
  return (
    <div className="flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
