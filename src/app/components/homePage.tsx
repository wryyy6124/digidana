"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Session } from "@supabase/supabase-js";
import { supabaseClient } from "@/utils/supabase/client";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";

import Header from "./header";
import Footer from "./footer";
import { logoff } from "../(auth)/login/actions";

const HomePage = (): JSX.Element => {
  const supabase = supabaseClient();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async (): Promise<void> => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
    };

    getSession();
  }, [supabase]);

  const handleLogoff = (): void => {
    logoff();
  };

  return (
    <>
      <Header />
      <Box as="main" id={`home`} width="100%">
        <Box
          id={`home__inner`}
          mx="auto"
          p={8}
          pb={32}
          width="100%"
          maxW="1024px"
        >
          <div className={`bg-lime-100 p-4 mb-4`}>
            <p className={`font-bold text-xl mb-2`}>簡易リンク導線</p>
            <ul>
              {session ? (
                <>
                  <li>
                    <Link href={`/`}>トップ</Link>
                  </li>
                  <li onClick={handleLogoff}>ログオフ</li>
                  <li>
                    <Link href={`/private`}>認証検証</Link>
                  </li>
                  <li>
                    <Link href={`/search`}>書籍検索・登録</Link>
                  </li>
                  <li>
                    <Link href={`/volumes/volumesId`}>単行本ページ</Link>
                  </li>
                  <li>
                    <Link href={`/series/seriesId`}>シリーズ詳細</Link>
                  </li>
                </>
              ) : (
                <li>Loading...</li>
              )}
            </ul>
          </div>

          <h2 id={`home__header`} className={`font-bold text-2xl mb-4`}>
            マイライブラリ
            <ChevronDownIcon />
          </h2>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default HomePage;
