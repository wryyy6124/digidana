"use client";

import React from "react";
import { Heading, Image } from "@chakra-ui/react";

const AppLogo = (): JSX.Element => {
  return (
    <Heading as="h1" id={`pages__logo`} className={`text-center inline-block`}>
      <Image src="/logo.png" alt="デジダナ Digital Hondana" w="full" h="auto" />
    </Heading>
  );
};

export default AppLogo;
