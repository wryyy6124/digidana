"use server";

import { supabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import VolumesIdPage from "./component/volumesIdPage";

const Volumes = async (): Promise<JSX.Element> => {
  const supabase = supabaseServer();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    redirect("/login");
  }

  return <VolumesIdPage />;
};

export default Volumes;
