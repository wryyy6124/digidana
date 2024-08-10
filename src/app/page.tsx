"use client";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Box id={`home`} width="100%">
        <Box id={`home__inner`}>
          <div className={`bg-lime-100 p-4 mb-4`}>
            <p className={`font-bold text-xl mb-2`}>簡易導線</p>
            <ul>
              <li>
                <Link href={`/`}>トップ</Link>
              </li>
              <li>
                <Link href={`/login`}>ログイン</Link>
              </li>
              <li>
                <Link href={`/regist`}>登録</Link>
              </li>
              <li>
                <Link href={`/dasdassdfd`}>漫画タイトルの詳細ページ</Link>
              </li>
              <li>
                <Link href={`/dasdassdfd/1`}>単行本の詳細ページ</Link>
              </li>
            </ul>
          </div>

          <h2 id={`home__header`} className={`font-bold text-2xl mb-4`}>
            マイライブラリ
            <ChevronDownIcon />
          </h2>
        </Box>
      </Box>
    </>
  );
}
