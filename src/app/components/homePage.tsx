"use client";

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
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";

import Header from "./header";
import Footer from "./footer";
import { useEffect, useState } from "react";
interface booksProps {
  books: booksType[];
}

const groupBooksBySeries = (books: booksType[]) => {
  return books.reduce((acc, book) => {
    if (!acc[book.series_id]) {
      acc[book.series_id] = [];
    }
    acc[book.series_id].push(book);

    return acc;
  }, {} as Record<string, booksType[]>);
};

const HomePage = ({ books }: booksProps): JSX.Element => {
  const [receiveBooks, setReceiveBooks] = useState(groupBooksBySeries(books));

  useEffect(() => {
    setReceiveBooks(groupBooksBySeries(books));
  }, [books]);

  return (
    <>
      <Header />
      <Box as="main" id={`home`} w="full">
        <Box id={`home__inner`} mx="auto" p={8} pb={32} w="full" maxW="1024px">
          <Text
            as="h2"
            id={`home__header`}
            fontSize="xl"
            fontWeight="bold"
            mb={10}
          >
            マイライブラリ
          </Text>
          <Accordion allowMultiple w="full">
            {Object.keys(receiveBooks).map((series_id) => (
              <AccordionItem key={series_id} gap={4} w="full">
                <AccordionButton>
                  <Box
                    as="h3"
                    flex="1"
                    textAlign="left"
                    fontSize="xl"
                    fontWeight="bold"
                    p={4}
                  >
                    {series_id === "null"
                      ? "【その他】"
                      : receiveBooks[`${series_id}`][0].title
                          .replace(/(\s*[\(\（]?\d+[\)\）]?\s*巻?)$/, "")
                          .substring(0, 30)}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel py={10} px={4} w="full">
                  <Grid
                    templateColumns={{
                      base: "repeat(1, 1fr)",
                      sm: "repeat(1, 1fr)",
                      md: "repeat(2, 1fr)",
                      xl: "repeat(3, 1fr)",
                    }}
                    gap={4}
                    w="full"
                  >
                    {receiveBooks[series_id]
                      .slice()
                      .sort(
                        (a, b) => (a.order_number || 0) - (b.order_number || 0)
                      )
                      .map((book) => (
                        <GridItem
                          key={book.volume_id}
                          className={book.is_buy ? "" : "is_buy"}
                          borderWidth={1}
                          borderRadius="md"
                          boxShadow="sm"
                          w="full"
                          p={6}
                        >
                          <Text
                            as="h4"
                            display="flex"
                            alignItems="center"
                            fontSize="xl"
                            fontWeight="bold"
                            mb="1em"
                            minH="3em"
                          >
                            {series_id !== "null" ? (
                              <span>{book.order_number}巻</span>
                            ) : (
                              <span>
                                {book.title.length <= 20
                                  ? book.title
                                  : book.title.substring(0, 15) + "..."}
                              </span>
                            )}
                          </Text>
                          <Flex
                            bg="gray.50"
                            justifyContent="center"
                            alignItems="center"
                            height="200px"
                            w="full"
                            mb={8}
                            p={6}
                            pb={8}
                          >
                            <Box
                              w="full"
                              h="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              {book.thumbnail_url ? (
                                <Image
                                  src={book.thumbnail_url}
                                  alt={book.title}
                                  objectFit="cover"
                                  transform="rotate(5deg)"
                                  boxShadow="5px 5px 10px 0px #aaa"
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
                            </Box>
                          </Flex>
                          <Button
                            size="lg"
                            colorScheme="blue"
                            p="8"
                            w="full"
                            _hover={{
                              transform: "scale(1.01)",
                              transition: "transform 0.4s",
                            }}
                            _active={{ transform: "scale(0.95)" }}
                          >
                            <Link
                              href={`./volumes/${book.volume_id}`}
                              color="white"
                              _hover={{ textDecoration: "underline" }}
                            >
                              詳細ページへ
                            </Link>
                          </Button>
                        </GridItem>
                      ))}
                  </Grid>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default HomePage;
