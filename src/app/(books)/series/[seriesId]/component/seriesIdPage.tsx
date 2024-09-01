"use client";

import React from "react";
import { Box, Heading } from "@chakra-ui/react";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

const SeriesIdPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <Box as="main" id={`SeriesIdPage`} w="full" pt={100}>
        <Box
          id={`SeriesIdPage__inner`}
          mx="auto"
          p={8}
          pb={32}
          width="full"
          maxW="1024px"
        >
          <Heading
            as="h2"
            id={`SeriesIdPage__header`}
            className={`font-bold text-2xl mb-4`}
          >
            漫画シリーズタイトルの詳細ページ
          </Heading>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default SeriesIdPage;
