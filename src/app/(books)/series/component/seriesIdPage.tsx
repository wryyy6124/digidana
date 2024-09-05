"use client";

import React from "react";
import { Box, Text } from "@chakra-ui/react";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

interface seriesProps {
  seriesData: {
    created_at: string;
    user_id: string;
    series_id: string;
    series_title: string;
    id: string;
  }[];
}

const SeriesIdPage = ({ seriesData }: seriesProps): JSX.Element => {
  // console.log(seriesData);

  return (
    <>
      <Header />
      <Box
        as="main"
        id={`SeriesIdPage`}
        bg="linear-gradient(90deg, #f7fafc 25%, #fdfdfd 25%, #fdfdfd 50%, #f7fafc 50%, #f7fafc 75%, #fdfdfd 75%, #fdfdfd 100%)"
        backgroundSize="1000px 1000px"
        backgroundPosition="center"
        w="full"
        minH="100%"
        py={100}
      >
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
            display="inline-flex"
            alignItems="center"
            fontSize="3xl"
            fontWeight="bold"
            mb={10}
          >
            シリーズタイトル編集ページ
          </Text>
          {seriesData &&
            seriesData.map((data) => (
              <Box>
                <Text key={data.id}>{data.series_title}</Text>
              </Box>
            ))}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default SeriesIdPage;
