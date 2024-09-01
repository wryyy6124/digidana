"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabaseClient } from "@/utils/supabase/client";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Grid,
  GridItem,
  Image,
  Link,
  Flex,
  Button,
  Heading,
} from "@chakra-ui/react";

import { BiMessageAltDetail } from "react-icons/bi";
import { GiOpenBook } from "react-icons/gi";
import { MdDeleteForever } from "react-icons/md";

interface booksAccordionProps {
  receiveBooks: Record<string, booksType[]>;
}

const BooksAccordion = ({ receiveBooks }: booksAccordionProps): JSX.Element => {
  const router = useRouter();
  const supabase = supabaseClient();

  const [booksData, setBooksData] = useState(receiveBooks);

  const handleDelete = async (seriesId: string, volumeId: string) => {
    const reply = confirm("削除しますか？この操作は取り消せません");
    if (!reply) return;

    try {
      const { error: volumesError } = await supabase
        .from("volumes")
        .delete()
        .eq("volume_id", volumeId);

      if (volumesError) {
        console.error("Error deleting volumes:", volumesError);
        return;
      }

      const updatedBooks = { ...booksData };

      updatedBooks[seriesId] = updatedBooks[seriesId].filter(
        (book) => book.volume_id !== volumeId
      );

      if (!(seriesId === "null") && updatedBooks[seriesId].length === 0) {
        console.log("seriesId 0 items");

        delete updatedBooks[seriesId];

        try {
          const { error: seriesError } = await supabase
            .from("series")
            .delete()
            .eq("series_id", seriesId);

          if (seriesError) {
            console.error("Error deleting series:", seriesError);
            return;
          }
        } catch (seriesError) {
          console.error("Error deleting series:", seriesError);
        }
      }

      setBooksData(updatedBooks);
    } catch (error) {
      console.error("Error deleting volumes:", error);
    }

    router.refresh();
  };

  return (
    <Accordion id={`accordion`} allowMultiple w="full">
      {Object.keys(booksData)
        .sort((a, b) => {
          const titleA =
            a === "null"
              ? "【その他書籍】"
              : booksData[a][0].title
                  .replace(/(\s*[\(\（]?\d+[\)\）]?\s*巻?)$/, "")
                  .substring(0, 30);
          const titleB =
            b === "null"
              ? "【その他書籍】"
              : booksData[b][0].title
                  .replace(/(\s*[\(\（]?\d+[\)\）]?\s*巻?)$/, "")
                  .substring(0, 30);

          return titleB.localeCompare(titleA, "ja", { numeric: true });
        })
        .map((series_id) => (
          <AccordionItem key={series_id} gap={4} w="full">
            <AccordionButton
              p={0}
              pr="1em"
              _hover={{ bg: "gray.50" }}
              _expanded={{ bg: "gray.50" }}
            >
              <Heading
                as="h3"
                flex="1"
                fontSize="xl"
                fontWeight="bold"
                textAlign="left"
                transition="background 0.4s"
                px="1em"
                py={8}
              >
                <GiOpenBook className="inline mr-2" />
                {series_id === "null"
                  ? `その他書籍【 ${booksData[series_id].length}冊 】`
                  : `${booksData[series_id][0].title
                      .replace(/(\s*[\(\（]?\d+[\)\）]?\s*巻?)$/, "")
                      .substring(0, 30)} 【 ${
                      booksData[series_id].length
                    }冊 】`}
              </Heading>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel p={0} w="full">
              <Grid
                as="ul"
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  xl: "repeat(3, 1fr)",
                }}
                gap={{
                  base: 4,
                  md: 6,
                }}
                py={16}
                w="full"
              >
                {booksData[series_id]
                  .slice()
                  .sort((a, b) => (a.order_number || 0) - (b.order_number || 0))
                  .map((book) => (
                    <GridItem
                      key={book.volume_id}
                      as="li"
                      className={book.is_buy ? "" : "is_not_buy"}
                      borderWidth={1}
                      borderRadius="md"
                      boxShadow="sm"
                      p={{
                        base: 4,
                        md: 6,
                      }}
                      pt={{
                        base: 2,
                        md: 4,
                      }}
                      w="full"
                    >
                      <Heading
                        as="h4"
                        fontWeight="bold"
                        display="flex"
                        alignItems="center"
                        mb={3}
                        minH="2.4em"
                      >
                        {series_id !== "null" ? (
                          <Box as="span" fontSize="2xl">
                            {book.order_number}巻
                          </Box>
                        ) : (
                          <Box as="span" fontSize="md">
                            {book.title.length <= 20
                              ? book.title
                              : book.title.substring(0, 20) + "..."}
                          </Box>
                        )}
                      </Heading>
                      <Flex
                        bg="linear-gradient(135deg, #f7fafc 25%, #fdfdfd 25%, #fdfdfd 50%, #f7fafc 50%, #f7fafc 75%, #fdfdfd 75%, #fdfdfd 100%)"
                        backgroundSize="150px 150px"
                        alignItems="center"
                        justifyContent="center"
                        mb={6}
                        p={6}
                        pb={8}
                        w="full"
                        h="200px"
                      >
                        <Flex
                          alignItems="center"
                          justifyContent="center"
                          w="full"
                          h="100%"
                        >
                          {book.thumbnail_url ? (
                            <Image
                              src={book.thumbnail_url}
                              alt={book.title}
                              boxShadow="5px 5px 10px 0px #999"
                              objectFit="cover"
                              transform="rotate(5deg)"
                              w="full"
                              h="100%"
                            />
                          ) : (
                            <Image
                              src="/not_image.jpg"
                              alt="notimage"
                              objectFit="cover"
                              opacity="0.2"
                              w="full"
                              h="100%"
                            />
                          )}
                        </Flex>
                      </Flex>
                      <Flex justifyContent="center" gap={6}>
                        <Button
                          backgroundColor="blue.400"
                          color="white"
                          display="flex"
                          position="relative"
                          overflow="hidden"
                          px="0"
                          maxW="100%"
                          w="fit-content"
                          h="auto"
                          _before={{
                            backgroundColor: "blue.700",
                            content: `""`,
                            display: "inline-block",
                            transition: "0.5s",
                            position: "absolute",
                            top: "0",
                            right: "100%",
                            w: "full",
                            h: "100%",
                          }}
                          _hover={{
                            _before: { right: "0" },
                          }}
                        >
                          <Link
                            href={`./volumes/${book.volume_id}`}
                            color="white"
                            zIndex="1"
                            p={4}
                            w="full"
                            _hover={{
                              textDecor: "none",
                            }}
                          >
                            <Box
                              as="span"
                              display="flex"
                              alignItems="center"
                              gap={2}
                            >
                              <BiMessageAltDetail d="inline" />
                              詳細ページ
                            </Box>
                          </Link>
                        </Button>
                        <Button
                          backgroundColor="red.400"
                          color="white"
                          display="flex"
                          position="relative"
                          overflow="hidden"
                          px="0"
                          maxW="100%"
                          w="fit-content"
                          h="auto"
                          _before={{
                            backgroundColor: "red.700",
                            content: `""`,
                            display: "inline-block",
                            transition: "0.5s",
                            position: "absolute",
                            top: "0",
                            right: "100%",
                            w: "full",
                            h: "100%",
                          }}
                          _hover={{
                            _before: { right: "0" },
                          }}
                          onClick={() =>
                            handleDelete(series_id, book.volume_id)
                          }
                        >
                          <Flex
                            color="white"
                            alignItems="center"
                            gap={2}
                            zIndex="1"
                            p={4}
                            w="full"
                          >
                            <MdDeleteForever />
                            削除
                          </Flex>
                        </Button>
                      </Flex>
                    </GridItem>
                  ))}
              </Grid>
            </AccordionPanel>
          </AccordionItem>
        ))}
    </Accordion>
  );
};

export default BooksAccordion;
