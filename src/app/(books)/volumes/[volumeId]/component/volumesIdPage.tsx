"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { supabaseClient } from "@/utils/supabase/client";

import { Box, Button, Flex, Image, Link, Text } from "@chakra-ui/react";

import { BsGooglePlay } from "react-icons/bs";
import { LiaDoorOpenSolid } from "react-icons/lia";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

const VolumesIdPage = ({ volume }: { volume: booksType }): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <>
      <Header />
      <Box as="main" w="full" py={100}>
        <Flex
          justifyContent={{ sm: "center", md: "flex-end" }}
          alignItems="center"
          mx="auto"
          mb={6}
          w="full"
          maxW="768px"
        >
          <Link href={`/`}>
            <Button
              colorScheme="blue"
              size="lg"
              leftIcon={<LiaDoorOpenSolid />}
              variant="outline"
            >
              トップページへ
            </Button>
          </Link>
        </Flex>
        {volume && (
          <Flex
            bg="white"
            borderTop="1px"
            borderTopColor="gray.200"
            borderRadius={{ sm: "none", md: "md" }}
            boxShadow="md"
            flexFlow="column"
            gap={6}
            mx="auto"
            p={6}
            w="full"
            maxW="768px"
          >
            <>
              <Flex flexFlow="column" gap={2}>
                <Text as="h2" fontSize="3xl" fontWeight="bold">
                  {volume.title}
                </Text>
                <Flex gap={4} fontSize="md" color="gray.600">
                  {volume.publishedDate && (
                    <Text>発売日: {volume.publishedDate}</Text>
                  )}
                  <Text>著者: {volume.authors}</Text>
                </Flex>
              </Flex>
              <Flex alignItems="center" gap={10}>
                {volume.thumbnail_url ? (
                  <Image
                    src={volume.thumbnail_url}
                    alt={volume.title}
                    borderRadius="lg"
                    objectFit="cover"
                    w="full"
                    h="100%"
                  />
                ) : (
                  <Image
                    src="/not_image.jpg"
                    alt="notimage"
                    borderRadius="md"
                    objectFit="cover"
                    w="full"
                    h="100%"
                  />
                )}
                <Text fontSize="lg">{volume.description}</Text>
              </Flex>
              <Flex justifyContent="flex-end">
                <Link href={volume.infoLink} isExternal>
                  <Button
                    leftIcon={<BsGooglePlay />}
                    colorScheme="teal"
                    variant="solid"
                    size="lg"
                  >
                    電子書籍リンク
                  </Button>
                </Link>
              </Flex>
            </>
          </Flex>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default VolumesIdPage;
