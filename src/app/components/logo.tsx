import React from "react";
import Link from "next/link";
import { Box, Image } from "@chakra-ui/react";

const AppLogo = (): JSX.Element => {
  return (
    <Box as="h1" id={`pages__logo`} className={`text-center inline-block`}>
      <Link href={`/`}>
        <Image
          src="/logo.png"
          alt="デジダナ Digital Hondana"
          w="full"
          h="auto"
        />
      </Link>
    </Box>
  );
};

export default AppLogo;
