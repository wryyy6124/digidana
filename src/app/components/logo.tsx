"use client";

import React from "react";
import { Box, Image } from "@chakra-ui/react";

const AppLogo = (): JSX.Element => {
  return (
    <Box as="h1" id={`pages__logo`} textAlign="center" display="inline-block">
      <Image
        src={`/logo.png`}
        alt={`デジダナ Digital Hondana`}
        w="full"
        h="auto"
      />
    </Box>
  );
};

export default AppLogo;
