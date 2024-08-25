"use server";

import { supabaseServer } from "@/utils/supabase/server";
const supabase = supabaseServer();

export const register = async (book: gBookItem): Promise<string> => {
  try {
    const { data: existingBook, error: fetchError } = await supabase
      .from("volumes")
      .select("user_id")
      .eq("volume_id", book.id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError;
    }

    if (existingBook) {
      // console.error("この書籍は既に登録されています。:", fetchError);
      // alert("この書籍は既に登録されています。");
      return "この書籍は既に登録済みです！";
    }

    const { data, error } = await supabase.from("volumes").insert([
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

    if (error) {
      throw error;
    }

    console.log("登録データ:", book);

    return "データベースへ登録が完了しました！🥳";
  } catch (error) {
    console.log("エラーメッセージ:", error);

    return "処理が異常終了しました";
  }
};
