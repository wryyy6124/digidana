"use client";

import React from "react";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

import Link from "next/link";
import { Box, Text } from "@chakra-ui/react";

const VolumesIdPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <Box as="main" id={`volumesIdPage`} width="100%">
        <Box
          id={`volumesIdPage__inner`}
          mx="auto"
          p={8}
          pb={32}
          width="100%"
          maxW="1024px"
        >
          <Text
            as="h2"
            id={`volumesIdPage__header`}
            className={`font-bold text-2xl mb-4`}
          >
            単行本の詳細ページ
          </Text>
          <Text as="p" id={`volumesIdPage__header`} className={`text-xl mb-4`}>
            <Link href={`../series/seriesId`}>このシリーズの詳細</Link>
          </Text>
          <Link href={`./volumesId_1`}>1巻</Link>
          <Link href={`./volumesId_2`}>2巻</Link>
          <Link href={`./volumesId_3`}>3巻</Link>
          <Link href={`./volumesId_4`}>4巻</Link>
          <Link href={`./volumesId_5`}>5巻</Link>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default VolumesIdPage;
