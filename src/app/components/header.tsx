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
  Text,
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
import { FaEdit, FaHome } from "react-icons/fa";
import { CgLogOff } from "react-icons/cg";
import { FaCircleUser } from "react-icons/fa6";

import { supabaseClient } from "@/utils/supabase/client";

const Header = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const pathName = usePathname();
  const supabase = supabaseClient();

  const [loading, setLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .single();

      if (profileError) {
        console.error("Error profile data:", profileError);
        return;
      }

      setUserName(profile.nick_name);
    };

    fetchProfile();
  }, [supabase]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleLogoff = async (): Promise<void> => {
    setLoading(true);
    await logoff();
  };

  if (loading) return <Loading />;

  return (
    <>
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
      </Box>

      <Modal id={`modal`} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay id={`modal__overlay`} />
        <ModalContent id={`modal__contents`}>
          <ModalHeader id={`modal__header`}>
            <Flex alignItems="center" gap={2} fontSize="md">
              ユーザー名：
              <Text fontSize="2xl">{userName}</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton id={`modal__close`} />
          <ModalBody id={`modal__body`} px={8} pb={8} pt={4}>
            <Flex as="ul" fontSize="xl" flexDirection="column" gap={8}>
              {!(pathName === "/") ? (
                <Box
                  as="li"
                  transition="0.4s"
                  _hover={{
                    color: "blue.400",
                  }}
                  w="full"
                >
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
              {!(pathName === "/profile") ? (
                <Box
                  as="li"
                  transition="0.4s"
                  _hover={{
                    color: "blue.400",
                  }}
                  w="full"
                >
                  <Link
                    href={`/profile`}
                    onClick={() => {
                      setLoading(true);
                    }}
                  >
                    <Flex alignItems="center" gap={2}>
                      <FaCircleUser />
                      ユーザ情報
                    </Flex>
                  </Link>
                </Box>
              ) : null}
              {!(pathName === "/search") ? (
                <Box
                  as="li"
                  transition="0.4s"
                  _hover={{
                    color: "blue.400",
                  }}
                  w="full"
                >
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
              {!(pathName === "/series") ? (
                <Box
                  as="li"
                  transition="0.4s"
                  _hover={{
                    color: "blue.400",
                  }}
                  w="full"
                >
                  <Link
                    href={`/series`}
                    onClick={() => {
                      setLoading(true);
                    }}
                  >
                    <Flex alignItems="center" gap={2}>
                      <FaEdit />
                      シリーズ名編集
                    </Flex>
                  </Link>
                </Box>
              ) : null}
              <Box
                as="li"
                color="red.500"
                cursor="pointer"
                fontWeight="bold"
                transition="0.4s"
                mt={10}
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
    </>
  );
};

export default Header;
