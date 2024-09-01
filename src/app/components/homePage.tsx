"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Box, Heading, Text } from "@chakra-ui/react";

import Header from "./header";
import Footer from "./footer";
import NotRegistered from "./notRegistered";
import BooksAccordion from "./booksAccordion";

import { GiBookshelf } from "react-icons/gi";

import { supabaseClient } from "@/utils/supabase/client";

interface booksProps {
  books: booksType[];
}

const HomePage = ({ books }: booksProps): JSX.Element => {
  const router = useRouter();
  const supabase = supabaseClient();

  const [nickName, setNickName] = useState<string | null>("");

  useEffect(() => {
    const fetchNickName = async () => {
      try {
        const { data, error: dbError } = await supabase
          .from("profiles")
          .select("*")
          .single();

        setNickName(data.nick_name);
      } catch (dbError) {
        console.error(dbError);
      }
    };
    fetchNickName();

    router.refresh();
  }, []);

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
      <Box as="main" id={`home`} w="full" pt={100}>
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
          {nickName ? <Text>こんにちは、{nickName}さん</Text> : null}
          <Heading
            as="h2"
            id={`home__header`}
            fontSize="3xl"
            fontWeight="bold"
            mb={10}
          >
            <GiBookshelf className="inline mr-2" />
            マイライブラリ
          </Heading>

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
