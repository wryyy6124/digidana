"use client";

import React from "react";
import { Box, Text } from "@chakra-ui/react";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

const ProfilePage = (): JSX.Element => {
  return (
    <>
      <Header />
      <Box as="main" id={`profilePage`} w="full" py={100}>
        <Box
          id={`profilePage__inner`}
          mx="auto"
          p={8}
          pb={32}
          w="full"
          maxW="1024px"
        >
          <Text
            as="h2"
            id={`profilePage__header`}
            display="inline-flex"
            alignItems="center"
            fontSize="3xl"
            fontWeight="bold"
            mb={10}
          >
            ユーザー情報ページ
          </Text>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ProfilePage;
