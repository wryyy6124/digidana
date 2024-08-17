"use client";

import { ChangeEvent, useState } from "react";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  UnorderedList,
  ListItem,
  Text,
  Image,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

const SearchBooksPage = (): JSX.Element => {
  const apiKey: gBooksAPI = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

  const [books, setBooks] = useState<gBookItem[]>([]);
  const [query, setQuery] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const searchBooks = async (): Promise<void> => {
    setBooks([]);

    if (query === "") {
      setMessage("入力内容がありません😴");
      return;
    } else {
      setMessage("ただいま検索中です...‼🤓");
    }

    const formattedQuery: string = query.split(/[\u3000\s]+/).join("+");

    const res: Response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${formattedQuery}&key=${apiKey}&maxResults=40&orderBy=relevance&filter=paid-ebooks&printType=books&langRestrict=ja`
    );
    const data: gBookType = await res.json();

    const comic: gBookItem[] = Array.from(
      new Set(
        data.items.map((item: gBookItem): string => item.volumeInfo.title)
      )
    )
      .map((title: string): gBookItem | undefined =>
        data.items.find(
          (item): gBookItem | boolean => item.volumeInfo.title === title
        )
      )
      .filter(
        (item): item is gBookItem =>
          item !== undefined && item.volumeInfo.title.includes(query)
      )
      .sort((a: gBookItem, b: gBookItem): number =>
        a.volumeInfo.title.localeCompare(b.volumeInfo.title)
      );

    if (!comic || comic.length === 0) {
      setMessage("なんの成果も！！得られませんでした！！😭");
      setBooks([]);
      return;
    } else {
      setMessage(null);
      setBooks(comic);
    }
  };

  return (
    <>
      <Header />
      <Box as="main" id={`seriesRegistration`} width="100%">
        <Box
          id={`seriesRegistration`}
          mx="auto"
          p={8}
          pb={32}
          width="100%"
          maxW="1024px"
        >
          <Text
            as="h2"
            id={`volumesIdPage__header`}
            className={`font-bold text-2xl mb-4`}
          >
            書籍検索・登録
          </Text>
          <InputGroup id="searchBooksPage__input" size="md" mb={10}>
            <Input
              type="text"
              pr="4.5rem"
              placeholder="検索したい書籍名を入力してください。"
              value={query}
              onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                setQuery(e.target.value)
              }
              focusBorderColor="green.500"
              _placeholder={{ color: "gray.500" }}
              borderRadius="lg"
              boxShadow="sm"
              _hover={{
                borderColor: "green.400",
                boxShadow: "md",
              }}
              _focus={{
                boxShadow: "0 0 0 3px rgba(72, 187, 120, 0.6)",
              }}
            />
            <InputRightElement width="4.5rem">
              <Button
                size="sm"
                colorScheme="green"
                onClick={(): void => {
                  searchBooks();
                }}
                _hover={{
                  transform: "scale(1.05)",
                  transition: "transform 0.2s",
                }}
                _active={{ transform: "scale(0.95)" }}
                width="full"
              >
                <Search2Icon mr={1} />
                検索
              </Button>
            </InputRightElement>
          </InputGroup>
          <UnorderedList
            id="searchBooksPage__list"
            spacing={6}
            m={0}
            styleType="none"
          >
            {message ? (
              <ListItem>
                <Text color="red.500" fontSize="xl" fontWeight="bold">
                  {message}
                </Text>
              </ListItem>
            ) : books.length > 0 ? (
              books.map((book: gBookItem) => (
                <ListItem
                  key={book.etag}
                  border="1px"
                  borderColor="gray.300"
                  borderRadius="sm"
                  bg="white"
                  display={{ base: "block", md: "flex" }}
                  flexDirection="column"
                  alignItems="flex-start"
                  gap={{ base: 8, md: 6 }}
                  p={{ base: 5, md: 6 }}
                  _hover={{
                    boxShadow: "md",
                    transform: "scale(1.01)",
                    transition: "all 0.4s",
                  }}
                >
                  <Box
                    id="searchBooksPage__info"
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    justifyContent="space-between"
                    alignItems="center"
                    flexGrow={1}
                    gap={{ base: 0, md: 4 }}
                    mb={{ base: 4, md: 0 }}
                  >
                    <Text
                      as="h2"
                      color="gray.700"
                      fontWeight="bold"
                      fontSize={{ base: "xl", md: "2xl" }}
                    >
                      {book.volumeInfo.title.trim()}
                    </Text>

                    <Box
                      display={{ base: "none", md: "flex" }}
                      flexDirection="row"
                      flexWrap="wrap"
                      gap={6}
                    >
                      {book.volumeInfo.authors && (
                        <Text fontStyle="italic" fontSize="sm" color="gray.500">
                          著者：{book.volumeInfo.authors?.join(", ")}
                        </Text>
                      )}
                      {book.volumeInfo.publishedDate && (
                        <Text fontStyle="italic" fontSize="sm" color="gray.500">
                          発売日：<time>{book.volumeInfo.publishedDate}</time>
                        </Text>
                      )}
                    </Box>
                  </Box>

                  <Box
                    id="searchBooksPage__discription"
                    display="flex"
                    flexDirection="row"
                    alignItems="stretch"
                    gap={{ base: 4, md: 6 }}
                    mb={{ base: 6, md: 0 }}
                    w="100%"
                  >
                    <Box
                      bg="gray.50"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      p={2}
                      w={{ base: "35%", md: "25%" }}
                    >
                      {book.volumeInfo.imageLinks ? (
                        <Box display="flex">
                          <Image
                            src={book.volumeInfo.imageLinks.thumbnail}
                            alt={book.volumeInfo.title}
                            w="100%"
                            h="auto"
                          />
                        </Box>
                      ) : (
                        <Box
                          borderRadius="md"
                          bg="gray.300"
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          fontStyle="italic"
                          textAlign="center"
                          p={4}
                          w={{ base: "100%", md: "150px" }}
                          h={"150px"}
                        >
                          <Text>Not</Text>
                          <Text>Image</Text>
                        </Box>
                      )}
                    </Box>

                    <Text
                      borderRadius="md"
                      border="1px"
                      borderColor="gray.300"
                      color="gray.700"
                      display="flex"
                      alignItems={"center"}
                      fontSize={{ base: "sm", md: "xl" }}
                      textAlign="left"
                      p={{ base: 5, md: 10 }}
                      whiteSpace="pre-wrap"
                      w={{ base: "65%", md: "100%" }}
                    >
                      {book.volumeInfo.description ? (
                        book.volumeInfo.description.substring(0, 60) + " ..."
                      ) : (
                        <Text
                          as="span"
                          color="gray.400"
                          fontStyle="italic"
                          fontSize={{ base: "md", md: "2xl" }}
                        >
                          掲載用のテキストデータがありません。
                        </Text>
                      )}
                    </Text>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent={{ base: "center", md: "flex-end" }}
                    w="100%"
                  >
                    <Button
                      size="lg"
                      colorScheme="blue"
                      p="8"
                      onClick={() => {
                        alert(`登録`);
                      }}
                      _hover={{
                        transform: "scale(1.01)",
                        transition: "transform 0.4s",
                      }}
                      _active={{ transform: "scale(0.95)" }}
                    >
                      この漫画を登録する
                    </Button>
                  </Box>
                </ListItem>
              ))
            ) : null}
          </UnorderedList>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default SearchBooksPage;
