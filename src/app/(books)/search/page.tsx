"use server";

import { supabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import SearchBooksPage from "./components/searchBooksPage";

const SearchBooks = async (): Promise<JSX.Element> => {
  const supabase = supabaseServer();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    console.log(`Un Authenticated...`);
    redirect("/login");
  }
  console.log(`Verified!!`);

  return <SearchBooksPage />;
};

export default SearchBooks;
