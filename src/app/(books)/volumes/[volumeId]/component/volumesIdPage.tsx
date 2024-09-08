"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Image,
  Link,
  Text,
  Textarea,
} from "@chakra-ui/react";

import { BsGooglePlay } from "react-icons/bs";
import { LiaDoorOpenSolid } from "react-icons/lia";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { FaBookmark } from "react-icons/fa6";
import { supabaseClient } from "@/utils/supabase/client";

type seriesType =
  | {
      order_number: number;
      thumbnail_url: string;
      volume_id: string;
    }[]
  | null;

const VolumesIdPage = ({
  volume,
  series,
}: {
  volume: booksType;
  series?: seriesType | undefined;
}): JSX.Element => {
  const router = useRouter();

  const volumeId: string = volume.volume_id;
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    router.refresh();
  }, [router]);

  const supabase = supabaseClient();
  const seriesId: string = volume.series_id;

  const [seriesTitle, setSeriesTitle] = useState<string>("");
  const [description, setDescription] = useState<string>(
    volume.description || ""
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchSeries = async (): Promise<void> => {
      if (seriesId) {
        try {
          const { data: seriesData, error: seriesError } = await supabase
            .from("series")
            .select("series_title")
            .eq("series_id", seriesId)
            .single();

          if (seriesError) {
            console.error(seriesError);
            setLoading(true);
            return;
          }

          setSeriesTitle(seriesData?.series_title);
        } catch (seriesError) {
          console.error(seriesError);
        }
      }
      setLoading(true);
    };

    fetchSeries();
  }, [supabase, seriesId]);

  const handleSaveDescription = async (): Promise<void> => {
    try {
      const { error } = await supabase
        .from("volumes")
        .update({ description })
        .eq("volume_id", volumeId);

      if (error) throw error;

      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error("Error saving description:", error);
    }
  };

  return (
    <>
      <Header />
      <Box
        as="main"
        bg="linear-gradient(135deg, #f7fafc 25%, #fdfdfd 25%, #fdfdfd 50%, #f7fafc 50%, #f7fafc 75%, #fdfdfd 75%, #fdfdfd 100%)"
        backgroundSize="1000px 1000px"
        backgroundPosition="center"
        py={{
          base: 100,
          md: 120,
        }}
        w="full"
        minH="100%"
      >
        <Flex
          justifyContent={{ base: "center", md: "flex-end" }}
          alignItems="center"
          mx="auto"
          mb={8}
          p={{ base: 0, md: "1em" }}
          w="full"
          maxW="1024px"
        >
          <Link href={`/`}>
            <Button
              bg="#fff"
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
            borderWidth={1}
            borderRadius={{ sm: "none", md: "md" }}
            boxShadow="md"
            flexFlow="column"
            gap={6}
            mx="auto"
            p={{ base: 4, md: 6 }}
            w="full"
            maxW="1024px"
          >
            <>
              <Flex flexFlow="column" gap={2}>
                <Text
                  as="h2"
                  color="blue.600"
                  fontSize={{
                    base: "xl",
                    md: "2xl",
                    lg: "3xl",
                  }}
                  fontWeight="bold"
                >
                  {volume.title}
                </Text>
                <Flex
                  gap={6}
                  fontSize={{ base: "sm", md: "md" }}
                  color="gray.500"
                >
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
                <Flex flexDirection="column" gap={4} w="full">
                  {isEditing ? (
                    <>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="任意の説明文を入力してください"
                        fontSize="lg"
                        resize="none"
                        minH={120}
                      />
                      <Flex gap={2}>
                        <Button
                          onClick={handleSaveDescription}
                          colorScheme="blue"
                        >
                          保存する
                        </Button>
                        <Button
                          onClick={() => setIsEditing(!isEditing)}
                          colorScheme="gray"
                        >
                          キャンセル
                        </Button>
                      </Flex>
                    </>
                  ) : (
                    <>
                      <Text
                        display="flex"
                        alignItems="center"
                        fontSize={{
                          base: "sm",
                          md: "md",
                          lg: "xl",
                        }}
                        minH={120}
                      >
                        {description || "説明テキストが空白のようです"}
                      </Text>
                      {!isEditing && (
                        <Checkbox
                          id="edit"
                          name="edit"
                          fontSize="sm"
                          fontStyle="italic"
                          onChange={() => setIsEditing(true)}
                        >
                          説明文を編集する
                        </Checkbox>
                      )}
                    </>
                  )}
                </Flex>
              </Flex>

              <Flex justifyContent="flex-end">
                <Link href={volume.infoLink} isExternal>
                  <Button
                    leftIcon={<BsGooglePlay />}
                    colorScheme="teal"
                    variant="solid"
                    size="lg"
                  >
                    Google Play
                  </Button>
                </Link>
              </Flex>
            </>
          </Flex>
        )}

        {loading && series && series.length > 1 ? (
          <Box mx="auto" mt={10} p={4} w="full" maxW="1024px">
            {seriesTitle && (
              <Text
                as="h3"
                fontSize={{ base: "xl", lg: "2xl" }}
                fontWeight="bold"
                mb={{ base: 4, md: 8 }}
              >
                <FaBookmark className={`inline mr-2`} />『{seriesTitle}
                』シリーズの書籍
              </Text>
            )}
            <Grid
              as="ol"
              templateColumns={{
                base: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
              }}
              gap={{ base: 4, md: 8 }}
              rowGap={{ base: 6, md: 12 }}
            >
              {series
                .filter((book) => book.volume_id !== volumeId)
                .sort((a, b) => (a.order_number || 0) - (b.order_number || 0))
                .map((book, index) => (
                  <Box
                    as="li"
                    key={book.volume_id}
                    className={`fade_in`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    bg="#fff"
                    boxShadow="sm"
                    borderWidth={1}
                    borderRadius="md"
                    transition="0.4s"
                    overflow="hidden"
                    pos="relative"
                    w="full"
                    _hover={{
                      bg: "blue.50",
                      borderColor: "blue.400",
                      boxShadow: "md",
                      color: "blue.400",
                    }}
                  >
                    <Text
                      bg="blue.300"
                      boxShadow="md"
                      color="white"
                      fontWeight="bold"
                      textAlign="center"
                      display="inline-block"
                      transform="rotate(-45deg)"
                      pos="absolute"
                      top={{ base: "10px", md: "5px" }}
                      left={{ base: "-30px", md: "-45px" }}
                      w={{ base: "120px", md: "150px" }}
                    >
                      <Flex
                        as="span"
                        fontSize={{ base: "xl", md: "2xl" }}
                        justifyContent="center"
                        alignItems="baseline"
                        gap={1}
                        p={1}
                      >
                        {book.order_number}
                        <Box as="span" fontSize="70%">
                          巻
                        </Box>
                      </Flex>
                    </Text>
                    <Link
                      href={`/volumes/${book.volume_id}`}
                      display="flex"
                      flexWrap="wrap"
                      alignItems="center"
                      justifyContent="center"
                      p={6}
                      pt={10}
                      w="full"
                      _hover={{ textDecoration: "none" }}
                    >
                      <Box transform="rotate(5deg)" w="fitContent">
                        {book.thumbnail_url ? (
                          <Image
                            src={book.thumbnail_url}
                            alt={`${book.order_number}巻`}
                            borderRadius="md"
                            objectFit="cover"
                            w="full"
                            h="120px"
                          />
                        ) : (
                          <Image
                            src="/not_image.jpg"
                            alt={`notimage`}
                            borderRadius="md"
                            objectFit="cover"
                            opacity="0.2"
                            w="full"
                            h="120px"
                          />
                        )}
                      </Box>
                    </Link>
                  </Box>
                ))}
            </Grid>
          </Box>
        ) : null}
      </Box>
      <Footer />
    </>
  );
};

export default VolumesIdPage;
