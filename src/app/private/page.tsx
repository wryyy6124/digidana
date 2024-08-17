"use server";

import { supabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import PravatePage from "./component/pravatePage";

const Private = async (): Promise<JSX.Element> => {
  const supabase = supabaseServer();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    redirect("/login");
  }

  return <PravatePage />;
};

export default Private;
