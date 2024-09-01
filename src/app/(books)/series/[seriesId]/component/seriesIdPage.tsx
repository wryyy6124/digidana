"use client";

import React from "react";
import { Box, Text } from "@chakra-ui/react";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

const SeriesIdPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <Box as="main" id={`SeriesIdPage`} w="full" py={100}>
        <Box
          id={`SeriesIdPage__inner`}
          mx="auto"
          p={8}
          pb={32}
          w="full"
          maxW="1024px"
        >
          <Text
            as="h2"
            id={`SeriesIdPage__header`}
            className={`font-bold text-2xl mb-4`}
          >
            漫画シリーズタイトルの詳細ページ
          </Text>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default SeriesIdPage;
