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
      const { data: books, error } = await supabase.from("volumes").select();

      if (error) {
        console.error("Error fetching data:", error);
      }

      return <HomePage books={books || []} />;
    } else {
      return <HomePage books={[]} />;
    }
  } catch (error) {
    console.error("Error:", error);

    return <HomePage books={[]} />;
  }
};

export default HomeServer;
