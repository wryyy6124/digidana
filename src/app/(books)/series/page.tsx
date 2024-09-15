"use server";

import { supabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import SeriesIdPage from "./component/seriesIdPage";

interface seriesProps {
  seriesData: seriesType[];
}

const Series = async (): Promise<JSX.Element> => {
  const supabase = supabaseServer();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    redirect("/login");
  }

  const fetchSeriesData = async () => {
    try {
      const { data: seriesData, error: seriesError } = await supabase
        .from("series")
        .select();

      if (seriesError) {
        throw new Error(`Error fetching series data: ${seriesError}`);
      }

      return { seriesData };
    } catch (seriesError) {
      console.error(seriesError);
      return { seriesData: [] };
    }
  };
  const seriesData: seriesProps = await fetchSeriesData();

  return <SeriesIdPage seriesData={seriesData.seriesData} />;
};

export default Series;
