"use server";

import { supabaseServer } from "@/utils/supabase/server";

export const register = async (book: gBookItem): Promise<string> => {
  const supabase = supabaseServer();

  try {
    const { data: existingBook, error: fetchError } = await supabase
      .from("volumes")
      .select("user_id")
      .eq("volume_id", book.id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.log(fetchError);
      throw fetchError;
    }

    if (existingBook) return "この書籍は既に登録済みです！";

    const { error: volumesError } = await supabase.from("volumes").insert([
      {
        volume_id: book.id,
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        authors: book.volumeInfo.authors || null,
        publisher: book.volumeInfo.publisher,
        publishedDate: book.volumeInfo.publishedDate || null,
        infoLink: book.volumeInfo.infoLink,
        thumbnail_url: book.volumeInfo.imageLinks?.thumbnail || null,
        series_id: book.volumeInfo.seriesInfo
          ? book.volumeInfo.seriesInfo.volumeSeries[0].seriesId
          : null,
        order_number: book.volumeInfo.seriesInfo
          ? book.volumeInfo.seriesInfo.volumeSeries[0].orderNumber
          : null,
      },
    ]);

    if (volumesError) {
      console.log(volumesError);
      throw volumesError;
    }

    if (book.volumeInfo.seriesInfo) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: existingSeries, error: seriesError } = await supabase
        .from("series")
        .select("user_id, series_id")
        .eq("series_id", book.volumeInfo.seriesInfo.volumeSeries[0].seriesId)
        .eq("user_id", user?.id)
        .single();

      if (seriesError && seriesError.code !== "PGRST116") {
        throw seriesError;
      }

      if (!existingSeries) {
        await supabase.from("series").insert([
          {
            series_id: book.volumeInfo.seriesInfo.volumeSeries[0].seriesId,
            user_id: user?.id,
            series_title: book.volumeInfo.title.replace(
              /(\s*[\(\（]?\d+[\)\）]?\s?)$/,
              ""
            ),
          },
        ]);

        return "シリーズ登録と書籍データの登録が完了しました！🥳";
      }
    }

    return "書籍データの登録が完了しました！🥳";
  } catch (error) {
    console.error("エラーメッセージ:", error);
    return "処理が異常終了しました";
  }
};
