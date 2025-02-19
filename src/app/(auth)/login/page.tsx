"use server";

import { supabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import LoginPage from "./components/loginPage";

const Login = async (): Promise<JSX.Element> => {
  const supabase = supabaseServer();

  console.log("【SERVER】SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log(
    "【SERVER】SUPABASE_ANON_KEY:",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return <LoginPage />;
};

export default Login;
