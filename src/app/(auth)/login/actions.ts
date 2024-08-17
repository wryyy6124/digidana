"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { supabaseServer } from "@/utils/supabase/server";

export async function login(formData: FormData): Promise<string | null> {
  const supabase = supabaseServer();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return "入力のメールアドレスかパスワードに誤りがあります。";
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData): Promise<string> {
  const supabase = supabaseServer();

  const inputData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    nickname: formData.get("nickname") as string,
  };

  const {
    data: { user },
    error: signupError,
  } = await supabase.auth.signUp({
    email: inputData.email,
    password: inputData.password,
  });

  if (signupError) {
    if (signupError.message === "User already registered") {
      return `既に登録済みのアカウントです。`;
    }
    return `登録処理が異常終了しました。DB管理者へお問い合わせください。${signupError.message}`;
  }

  const { error: updateError } = await supabase.from("profiles").insert([
    {
      user_id: user?.id,
      nick_name: inputData.nickname,
      created_at: new Date(),
    },
  ]);

  if (updateError) {
    return `ニックネームの登録処理が異常終了しました。DB管理者へお問い合わせください。${updateError.message}`;
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logoff(): Promise<void> {
  const supabase = supabaseServer();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  redirect("/login");
}
