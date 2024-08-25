"use server";

import HomePage from "./components/homePage";
import { supabaseServer } from "@/utils/supabase/server";

const HomeServer = async (): Promise<JSX.Element> => {
  const supabase = supabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(session);

  try {
    if (session) {
      const { data, error } = await supabase.from("volumes").select();

      if (error) {
        console.error("Error fetching books:", error);
      }

      // console.log(user);

      return <HomePage books={data || []} />;
    } else {
      return <HomePage books={[]} />;
    }
  } catch (error) {
    console.error("Error:", error);
    return <HomePage books={[]} />;
  }
};

export default HomeServer;
