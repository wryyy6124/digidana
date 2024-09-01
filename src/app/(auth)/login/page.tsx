"use server";

import { supabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import LoginPage from "./components/loginPage";

const Login = async (): Promise<JSX.Element> => {
  const supabase = supabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return <LoginPage />;
};

export default Login;
