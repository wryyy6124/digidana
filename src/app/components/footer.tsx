"use client";

import { Box, Text } from "@chakra-ui/react";

const Footer = (): JSX.Element => {
  return (
    <Box
      as="footer"
      id={`footer`}
      bg="gray.50"
      position="fixed"
      bottom={0}
      zIndex={10}
      w="full"
    >
      <Box
        id={`footer__inner`}
        mx="auto"
        p={6}
        w="full"
        maxW="1024px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text as="p" id={`footer__copylight`}>
          <strong>digidana &copy;K.T</strong>
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
