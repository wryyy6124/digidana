"use client";

import { Box, Flex, Text } from "@chakra-ui/react";

import {
  RiNextjsFill,
  RiSupabaseFill,
  RiTailwindCssFill,
} from "react-icons/ri";

import { AiFillGoogleCircle } from "react-icons/ai";
import { FaReact, FaWindows } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { LiaGithub } from "react-icons/lia";
import { PiFileCssFill, PiFileHtmlFill } from "react-icons/pi";
import { SiAdobephotoshop, SiChakraui } from "react-icons/si";
import { TbBrandVercel } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";
import { FaGitAlt } from "react-icons/fa6";

const Footer = (): JSX.Element => {
  return (
    <Box
      as="footer"
      id={`footer`}
      bg="#fafafa"
      pos="fixed"
      bottom={0}
      zIndex={2}
      w="full"
    >
      <Flex
        id={`footer__inner`}
        fontSize="sm"
        alignItems="center"
        justifyContent="space-between"
        gap={10}
        mx="auto"
        px={4}
        py={1}
        w="full"
        maxW="1280px"
      >
        <Text as="p" id={`footer__copylight`}>
          <Box as="strong">DigiDana &copy;K.T</Box>
        </Text>
        <Flex flexDirection="column" gap={2}>
          <Text fontWeight="bold">Created by</Text>
          <Flex flexDirection="row" gap={1}>
            <PiFileHtmlFill color="#e44d25" />
            <PiFileCssFill color="#0367b2" />
            <IoLogoJavascript color="#febd2f" />
            <FaReact color="#00d8ff" />
            <RiNextjsFill color="#242424" />
            <SiChakraui color="#40bbb1" />
            <RiTailwindCssFill color="#19b7ba" />
            <RiSupabaseFill color="#299b68" />
            <AiFillGoogleCircle color="#4285f4" />
            <VscVscode color="#1f8ad2" />
            <FaGitAlt color="#f05133" />
            <LiaGithub color="#242424" />
            <TbBrandVercel color="#242424" />
            <SiAdobephotoshop color="#31a8ff" />
            <FaWindows color="#1f8ad2" />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
