import type { Metadata } from "next";

import { Zen_Maru_Gothic } from "next/font/google";
import { ChakuraUIProviders } from "./components/uiProviders";
import "./globals.css";

const ZenKakuGothicNew = Zen_Maru_Gothic({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "デジダナ - digital hondana -",
  description: "アプリで管理するデジタル本棚です",
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
