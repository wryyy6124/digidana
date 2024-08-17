"use client";

import { Box } from "@chakra-ui/react";
import AppLogo from "./logo";

const Header = (): JSX.Element => {
  return (
    <Box
      as="header"
      id={`header`}
      bg="gray.50"
      position="sticky"
      top={0}
      zIndex={10}
      w="100%"
    >
      <Box
        id={`header__inner`}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mx="auto"
        p={4}
        w="100%"
        maxW="1024px"
      >
        <AppLogo />
        <nav id={`header__navi`}>メニュー</nav>
      </Box>
    </Box>
  );
};

export default Header;
