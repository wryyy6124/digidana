"use client";

import Link from "next/link";
import { logoff } from "../(auth)/login/actions";

import AppLogo from "./logo";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";

const Header = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogoff = (): void => {
    logoff();
  };

  return (
    <Box
      as="header"
      id={`header`}
      bg="gray.50"
      position="sticky"
      top={0}
      zIndex={10}
      w="full"
    >
      <Box
        id={`header__inner`}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mx="auto"
        p={4}
        w="full"
        maxW="1024px"
      >
        <Flex justifyContent="center" w="20%">
          <AppLogo />
        </Flex>
        <Button onClick={onOpen}>メニュー</Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl">ページナビゲーション</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={8}>
            <Box
              as="ul"
              display="flex"
              flexDirection="column"
              gap={8}
              fontSize="xl"
            >
              <Box as="li" w="full">
                <Link href="/" onClick={onClose}>
                  ホーム
                </Link>
              </Box>
              <Box as="li">
                <Link href={`/search`} onClick={onClose}>
                  書籍検索・登録
                </Link>
              </Box>
              <Box
                as="li"
                onClick={() => {
                  onClose();
                  handleLogoff();
                }}
              >
                ログオフ
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Header;
