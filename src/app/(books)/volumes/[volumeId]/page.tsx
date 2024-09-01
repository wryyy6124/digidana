"use server";

import { supabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import VolumesIdPage from "./component/volumesIdPage";

const Volumes = async ({
  params,
}: {
  params: { volumeId: string };
}): Promise<JSX.Element> => {
  const supabase = supabaseServer();
  const { volumeId } = params;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    console.log(`Un Authenticated...`);
    redirect("/login");
  }
  console.log(`Verified!!`);

  const { data: volume, error: volumeError } = await supabase
    .from("volumes")
    .select("*")
    .eq("volume_id", volumeId)
    .single();

  if (volumeError || !volume) {
    console.log(`volumeId Un Match...`);
    redirect("/");
  }
  console.log(`volumeId Match!!`);

  return <VolumesIdPage volume={volume} />;
};

export default Volumes;
