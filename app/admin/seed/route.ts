import { createClient } from "@supabase/supabase-js";
import { users } from "../../../data/users";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function GET(request: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );

    const successfulUsers = [];
    const failedUsers = [];
    let error;
    for (const user of users) {
      const { name, email, password, team } = user;
      try {
        // Create user
        const newUser = await supabase.auth.signUp({
          email,
          password,
        });
        console.log(newUser);
        // Create public profile
        const newProfile = await supabase.from("profiles").upsert({
          name,
          team,
          ["user_id"]: newUser.data.user?.id,
        });
        error = newProfile.error;
        successfulUsers.push(newUser);
      } catch (e) {
        failedUsers.push(user);
      }
    }
    const response = {
      error,
      failedUsers,
      successfulUsers,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
  // });
}
