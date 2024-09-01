"use client";

import { Box, Flex, Text } from "@chakra-ui/react";

import { AiFillGoogleCircle } from "react-icons/ai";
import { FaReact, FaWindows } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { LiaGithub } from "react-icons/lia";
import { PiFileCssFill, PiFileHtmlFill } from "react-icons/pi";

import {
  RiNextjsFill,
  RiSupabaseLine,
  RiTailwindCssFill,
} from "react-icons/ri";

import { SiAdobephotoshop, SiChakraui } from "react-icons/si";
import { TbBrandVercel } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

const Footer = (): JSX.Element => {
  return (
    <Box
      as="footer"
      id={`footer`}
      bg="white"
      position="fixed"
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
        p={3}
        w="full"
        maxW="1280px"
      >
        <Text as="p" id={`footer__copylight`}>
          <Box as="strong">DigiDana - &copy;K.T</Box>
        </Text>
        <Flex flexDirection="column" gap={2}>
          <Text fontWeight="bold">Created by</Text>
          <Flex flexDirection="row" gap={1}>
            <PiFileHtmlFill />
            <PiFileCssFill />
            <IoLogoJavascript />
            <FaReact />
            <RiNextjsFill />
            <SiChakraui />
            <RiTailwindCssFill />
            <RiSupabaseLine />
            <AiFillGoogleCircle />
            <VscVscode />
            <LiaGithub />
            <SiAdobephotoshop />
            <FaWindows />
            <TbBrandVercel />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
