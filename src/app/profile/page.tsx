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

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("nick_name")
    .eq("user_id", user.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError);
  }

  return <ProfilePage user={user} profile={profile || { nick_name: null }} />;
};

export default Profile;
