import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import Header from "./components/header";
import Footer from "./components/footer";

import { Providers } from "./providers";
import { Box } from "@chakra-ui/react";

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
        <Providers>
          <Header />
          <main id={`main`}>
            <Box
              id={`main__inner`}
              mx="auto"
              p={8}
              pb={32}
              width="100%"
              maxW="1024px"
            >
              {children}
            </Box>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
