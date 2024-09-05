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
  const { volumeId }: { volumeId: string } = params;

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

  // 自身のシリーズIDを取得
  const seriesId = volume.series_id;

  const { data: series, error: seriesError } = await supabase
    .from("volumes")
    .select("order_number, thumbnail_url, volume_id")
    .eq("series_id", seriesId);

  if (seriesError || series.length === 0) {
    console.log(`series_data is Nothing`);

    return <VolumesIdPage volume={volume} />;
  }
  console.log(`series_data found!!: total ${series.length}`);

  return <VolumesIdPage volume={volume} series={series} />;
};

export default Volumes;
