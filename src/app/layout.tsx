import type { Metadata } from "next";

import { ChakuraUIProviders } from "./components/uiProviders";
import { Zen_Maru_Gothic } from "next/font/google";

import "./globals.css";

const ZenKakuGothicNew = Zen_Maru_Gothic({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "デジダナ - Digital Hondana -",
  description: "WEBブラウザ上で管理するデジタル本棚です。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body id={`pages`} className={`${ZenKakuGothicNew.className}`}>
        <ChakuraUIProviders>{children}</ChakuraUIProviders>
      </body>
    </html>
  );
}
