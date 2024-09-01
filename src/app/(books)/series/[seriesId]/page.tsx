"use server";

import { supabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import SeriesIdPage from "./component/seriesIdPage";

const Series = async (): Promise<JSX.Element> => {
  const supabase = supabaseServer();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    redirect("/login");
  }

  return <SeriesIdPage />;
};

export default Series;
