"use server";

import HomePage from "./components/homePage";
import { supabaseServer } from "@/utils/supabase/server";

const HomeServer = async (): Promise<JSX.Element | undefined> => {
  const supabase = supabaseServer();

  const fetchListData = async (): Promise<HomePageProps> => {
    try {
      const { data: books, error: booksError } = await supabase
        .from("volumes")
        .select();

      if (booksError) {
        throw new Error(`Error fetching books data: ${booksError}`);
      }

      const { data: series, error: seriesError } = await supabase
        .from("series")
        .select();

      if (seriesError) {
        throw new Error(`Error fetching series data: ${seriesError}`);
      }

      return { books, series };
    } catch (error) {
      console.error(`Could not be obtained due to some Error: ${error}`);
      return { books: [], series: [] };
    }
  };
  const { books, series }: HomePageProps = await fetchListData();

  return <HomePage books={books} series={series} />;
};

export default HomeServer;
