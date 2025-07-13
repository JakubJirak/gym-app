import {RegisterForm} from "@/components/register/RegisterForm.tsx";
import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/register/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mt-20 flex justify-center">
      <RegisterForm/>
    </div>
  );
}
