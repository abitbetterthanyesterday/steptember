import { AddStepForm } from "@/components/AddStepForm";
import { AnimatedSidebar } from "@/components/AnimatedSidebar";
import { LoginForm } from "@/components/Login";
import { SingleBarChart } from "@/components/SingleBarChart";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { UserData } from "./types";
import { Title } from "@/components/Title";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.from("profiles").select(`
    name,
    steps (steps),
    team
`);

  const formattedData: UserData[] =
    data
      ?.map(
        (user: {
          name: string;
          steps: { steps: number };
          team: UserData["team"];
        }) => ({
          name: user.name,
          steps: user.steps.reduce(
            (accumulator: number, { steps }) => accumulator + steps,
            0
          ),
          team: user.team,
        })
      )
      .sort((a, b) => (a.steps > b.steps ? -1 : 1)) ?? [];

  if (error) {
    alert(
      "An error has occured when attempting to fetch the data, please contact Aloys on Slack if this persists."
    );
  }

  return (
    <div className={"flex items-center justify-center flex-col gap-4"}>
      <Title />
      {data && <SingleBarChart data={formattedData} />}
      <AnimatedSidebar isAuthenticated={Boolean(user)} />
    </div>
  );
}
