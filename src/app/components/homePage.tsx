"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Box, Flex, Text } from "@chakra-ui/react";

import Header from "./header";
import Footer from "./footer";
import NotRegistered from "./notRegistered";
import BooksAccordion from "./booksAccordion";

import { GiBookshelf } from "react-icons/gi";

interface Props {
  books: booksType[];
}

const HomePage = ({ books }: Props): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  const groupBooksBySeries = (books: booksType[]) => {
    return books.reduce((acc, book) => {
      if (!acc[book.series_id]) {
        acc[book.series_id] = [];
      }
      acc[book.series_id].push(book);

      return acc;
    }, {} as Record<string, booksType[]>);
  };
  const receiveBooks = groupBooksBySeries(books);

  return (
    <>
      <Header />
      <Box
        as="main"
        id={`home`}
        bg="linear-gradient(90deg, #f7fafc 25%, #fdfdfd 25%, #fdfdfd 50%, #f7fafc 50%, #f7fafc 75%, #fdfdfd 75%, #fdfdfd 100%)"
        backgroundSize="1000px 1000px"
        backgroundPosition="center"
        w="full"
        minH="100%"
        py={100}
      >
        <Box
          id={`home__inner`}
          mx="auto"
          p={{
            base: 4,
            md: 8,
          }}
          pb={{
            base: 20,
            md: 32,
          }}
          w="full"
          maxW="1280px"
        >
          <Flex justifyContent="space-between" mb={10}>
            <Text
              as="h2"
              id={`home__header`}
              display="inline-flex"
              alignItems="center"
              fontSize="3xl"
              fontWeight="bold"
            >
              <GiBookshelf className={`inline mr-2`} />
              マイライブラリ
            </Text>
          </Flex>

          {!(Object.keys(books).length === 0) ? (
            <BooksAccordion receiveBooks={receiveBooks} />
          ) : (
            <NotRegistered />
          )}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default HomePage;
