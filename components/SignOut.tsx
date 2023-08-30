"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const Signout = () => {
  const supabase = createClientComponentClient();
  return (
    <button
      onClick={async () => {
        await supabase.auth.signOut();
      }}
    >
      Sign out
    </button>
  );
};
