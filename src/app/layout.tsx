import type { Metadata } from "next";

import { Inter } from "next/font/google";
import { ChakuraUIProviders } from "./components/uiProviders";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body id={`pages`} className={`${inter.className}`}>
        <ChakuraUIProviders>{children}</ChakuraUIProviders>
      </body>
    </html>
  );
}
