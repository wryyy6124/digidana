"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { logoff } from "../(auth)/login/actions";

import AppLogo from "./logo";
import Loading from "./loading";

import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { Search2Icon } from "@chakra-ui/icons";
import { MdMenuOpen } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { CgLogOff } from "react-icons/cg";
import { IoNavigateCircle } from "react-icons/io5";

const Header = (): JSX.Element => {
  const pathName = usePathname();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleLogoff = async (): Promise<void> => {
    setLoading(true);
    await logoff();
  };

  if (loading) return <Loading />;

  return (
    <Box
      as="header"
      id={`header`}
      bg="white"
      boxShadow="sm"
      pos="fixed"
      top={0}
      left={0}
      zIndex={10}
      w="full"
    >
      <Flex
        id={`header__inner`}
        alignItems="center"
        justifyContent="space-between"
        mx="auto"
        p={2}
        w="full"
        maxW="1280px"
      >
        <Flex
          justifyContent="center"
          w={{
            base: "24%",
            md: "12%",
          }}
        >
          {!(pathName === "/") ? (
            <Link
              href={`/`}
              onClick={() => {
                setLoading(true);
              }}
            >
              <AppLogo />
            </Link>
          ) : (
            <AppLogo />
          )}
        </Flex>
        <Button onClick={onOpen}>
          <MdMenuOpen />
        </Button>
      </Flex>

      <Modal id={`modal`} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay id={`modal__overlay`} />
        <ModalContent id={`modal__contents`}>
          <ModalHeader id={`modal__header`} fontSize="2xl">
            <Flex alignItems="center" gap={2}>
              <IoNavigateCircle />
              ページナビゲーション
            </Flex>
          </ModalHeader>
          <ModalCloseButton id={`modal__close`} />
          <ModalBody id={`modal__body`} px={8} pb={8} pt={4}>
            <Flex as="ul" flexDirection="column" gap={4} fontSize="xl">
              {!(pathName === "/") ? (
                <Box as="li" w="full">
                  <Link
                    href={`/`}
                    onClick={() => {
                      setLoading(true);
                    }}
                  >
                    <Flex alignItems="center" gap={2}>
                      <FaHome />
                      トップページ
                    </Flex>
                  </Link>
                </Box>
              ) : null}
              {!(pathName === "/search") ? (
                <Box as="li" w="full">
                  <Link
                    href={`/search`}
                    onClick={() => {
                      setLoading(true);
                    }}
                  >
                    <Flex alignItems="center" gap={2}>
                      <Search2Icon />
                      書籍検索・登録
                    </Flex>
                  </Link>
                </Box>
              ) : null}
              <Box
                as="li"
                cursor="pointer"
                w="full"
                onClick={() => {
                  onClose();
                  setLoading(true);
                  handleLogoff();
                }}
              >
                <Flex alignItems="center" gap={2}>
                  <CgLogOff />
                  ログオフ
                </Flex>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Header;
