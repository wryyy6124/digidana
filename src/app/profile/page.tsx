"use server";

import { supabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ProfilePage from "./component/profilePage";

const Profile = async (): Promise<JSX.Element> => {
  const supabase = supabaseServer();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    redirect("/login");
  }

  console.log(user.email);

  return <ProfilePage />;
};

export default Profile;
