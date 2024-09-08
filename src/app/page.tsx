"use server";

import HomePage from "./components/homePage";
import { supabaseServer } from "@/utils/supabase/server";

const HomeServer = async (): Promise<JSX.Element> => {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    if (user) {
      const { data: books, error: booksError } = await supabase
        .from("volumes")
        .select();

      if (booksError) {
        console.error("Error fetching books data:", booksError);
      }

      const { data: series, error: seriesError } = await supabase
        .from("series")
        .select();

      if (seriesError) {
        console.error("Error fetching series data:", seriesError);
      }

      return <HomePage books={books || []} series={series || []} />;
    } else {
      return <HomePage books={[]} series={[]} />;
    }
  } catch (error) {
    console.error("Error:", error);

    return <HomePage books={[]} series={[]} />;
  }
};

export default HomeServer;
