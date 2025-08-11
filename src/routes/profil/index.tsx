import Header from "@/components/Header.tsx";
import UserAccInfo from "@/components/profil/UserAccInfo.tsx";
import UserSetGoals from "@/components/profil/UserSetGoals.tsx";
import UserWeightInput from "@/components/profil/UserWeightInput.tsx";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/profil/")({
  beforeLoad: ({ context }) => {
    if (!context.session) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Profil | GYM APPLICATION" },
      { name: "description", content: "Informace o profilu uživatele" },
    ],
  }),
});

function RouteComponent() {
  return (
    <div>
      <Header page="PROFIL" />
      <div className="max-w-[500px] w-[90%] mx-auto space-y-4 pb-8">
        <UserAccInfo />
        <UserWeightInput />
        <UserSetGoals />
      </div>
    </div>
  );
}
