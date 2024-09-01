import { type NextRequest } from "next/server";
import { redirect } from "next/navigation";

import { AuthError, type EmailOtpType } from "@supabase/supabase-js";
import { supabaseServer } from "@/utils/supabase/server";

export async function GET(request: NextRequest): Promise<void> {
  const { searchParams }: { searchParams: URLSearchParams } = new URL(
    request.url
  );

  const token_hash = searchParams.get("token_hash") as string | null;
  const type = searchParams.get("type") as EmailOtpType | null;
  const next: string = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const supabase = supabaseServer();

    const { error }: { error: AuthError | null } =
      await supabase.auth.verifyOtp({
        type,
        token_hash,
      });

    if (!error) redirect(next);
  }

  redirect("/error");
}
