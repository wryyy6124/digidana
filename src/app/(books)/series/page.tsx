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

  try {
    const { data: seriesData, error: seriesError } = await supabase
      .from("series")
      .select("*");

    if (seriesError) {
      console.error(seriesError);
      return <SeriesIdPage seriesData={[]} />;
    }

    return <SeriesIdPage seriesData={seriesData || []} />;
  } catch (seriesError) {
    console.error(seriesError);
  }

  return <SeriesIdPage seriesData={[]} />;
};

export default Series;
