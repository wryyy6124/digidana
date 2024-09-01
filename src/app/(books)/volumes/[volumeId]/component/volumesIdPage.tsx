"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { supabaseClient } from "@/utils/supabase/client";

import {
  Box,
  Button,
  Heading,
  Flex,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";

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
      <Box as="main" w="full" pt={100}>
        <Flex
          mx="auto"
          mb={6}
          justifyContent="flex-end"
          alignItems="center"
          pr={6}
          w="full"
          maxW="800px"
        >
          <Button
            as={Link}
            href="/"
            leftIcon={<LiaDoorOpenSolid />}
            colorScheme="blue"
            variant="outline"
            size="lg"
          >
            トップページへ戻る
          </Button>
        </Flex>
        {volume && (
          <Flex
            bg="white"
            borderTop="1px"
            borderTopColor="gray.100"
            borderRadius="md"
            boxShadow="md"
            flexFlow="column"
            gap={6}
            mx="auto"
            p={6}
            w="full"
            maxW="800px"
          >
            <>
              <Flex flexFlow="column" gap={4}>
                <Heading as="h2" size="xl">
                  {volume.title}
                </Heading>
                <Flex gap={4}>
                  {volume.publishedDate && (
                    <Text fontSize="md" color="gray.600" mb={4}>
                      発売日: {volume.publishedDate}
                    </Text>
                  )}
                  <Text fontSize="md" color="gray.600" mb={4}>
                    著者: {volume.authors}
                  </Text>
                </Flex>
              </Flex>
              <Flex alignItems="center" gap={10}>
                {volume.thumbnail_url ? (
                  <Image
                    src={volume.thumbnail_url}
                    alt={volume.title}
                    objectFit="cover"
                    borderRadius="md"
                    w="full"
                    h="100%"
                  />
                ) : (
                  <Image
                    src="/not_image.jpg"
                    alt="notimage"
                    objectFit="cover"
                    borderRadius="md"
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
