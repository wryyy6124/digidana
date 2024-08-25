"use client";

import { ChangeEvent, useState } from "react";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Pagination from "./pagenation";

import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  UnorderedList,
  ListItem,
  Text,
  Image,
  Spinner,
} from "@chakra-ui/react";

import { Search2Icon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { register } from "../actions";

const ITEMS_PER_PAGE = 8;
const apiKey: gBooksAPI = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

const MotionListItem = motion(ListItem);

const SearchBooksPage = (): JSX.Element => {
  const [books, setBooks] = useState<gBookItem[]>([]);
  const [query, setQuery] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBooks = books.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 10);
  };

  const searchBooks = async (): Promise<void> => {
    setCurrentPage(1);
    setLoading(true);

    try {
      setBooks([]);
      setMessage("検索中です🤓");

      const res: Response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&maxResults=40&orderBy=relevance&filter=paid-ebooks&printType=books&langRestrict=ja`
      );

      if (!query) {
        setLoading(false);
        setMessage("検索ワードは1文字以上の入力が必要です🙏");

        return;
      }

      if (!res.ok) {
        setLoading(false);

        throw new Error(
          "データの取得に失敗しました。サーバーからの応答がありません。"
        );
      }

      setLoading(false);
      const data: gBookType = await res.json();

      const sortingBooks = data.items
        .filter((item) =>
          item.volumeInfo.title.toLowerCase().includes(query.toLowerCase())
        )
        .sort((a, b) => {
          const hasSeriesInfoA =
            a.volumeInfo.seriesInfo &&
            a.volumeInfo.seriesInfo.volumeSeries?.[0]?.orderNumber !==
              undefined;
          const hasSeriesInfoB =
            b.volumeInfo.seriesInfo &&
            b.volumeInfo.seriesInfo.volumeSeries?.[0]?.orderNumber !==
              undefined;

          if (hasSeriesInfoA && hasSeriesInfoB) {
            const orderNumberA =
              a.volumeInfo.seriesInfo.volumeSeries[0].orderNumber;
            const orderNumberB =
              b.volumeInfo.seriesInfo.volumeSeries[0].orderNumber;
            return orderNumberA - orderNumberB;
          } else if (hasSeriesInfoA) {
            return -1;
          } else if (hasSeriesInfoB) {
            return 1;
          }

          const dateA = new Date(a.volumeInfo.publishedDate || "").getTime();
          const dateB = new Date(b.volumeInfo.publishedDate || "").getTime();

          return dateA - dateB;
        });

      if (!sortingBooks || sortingBooks.length === 0) {
        setMessage("なんの成果も！！得られませんでした！！😭");
        setBooks([]);
      } else {
        setMessage("");
        setBooks(sortingBooks);
      }

      return;
    } catch (error) {
      console.error("エラーが発生しました:", error);

      setBooks([]);
      setQuery("");

      setMessage("データの取得に失敗しました🙇‍♂️");
    }
  };

  const registerBook = async (book: gBookItem) => {
    // alert(`id: ${book.id}`);
    // alert(`title: ${book.volumeInfo.title}`);
    // alert(`authors: ${book.volumeInfo.authors}`);
    // alert(`publisher: ${book.volumeInfo.publisher}`);

    // book.volumeInfo.publishedDate
    //   ? alert(`publishedDate: ${book.volumeInfo.publishedDate}`)
    //   : null;

    // alert(`infoLink: ${book.volumeInfo.infoLink}`);
    // alert(`thumbnail: ${book.volumeInfo.imageLinks?.thumbnail}`);

    // if (book.volumeInfo.seriesInfo) {
    //   alert(`seriesId: ${book.volumeInfo.seriesInfo.volumeSeries[0].seriesId}`);
    //   alert(
    //     `orderNumber: ${book.volumeInfo.seriesInfo.volumeSeries[0].orderNumber}`
    //   );
    // }

    const messege = register(book);
    console.log(messege);
  };

  return (
    <>
      <Header />
      <Box as="main" id={`seriesRegistration`} width="full">
        <Box
          id={`seriesRegistration`}
          mx="auto"
          p={8}
          pb={32}
          width="full"
          maxW="1024px"
        >
          <Text
            as="h2"
            id={`volumesIdPage__header`}
            fontSize="xl"
            fontWeight="bold"
            mb={4}
          >
            書籍検索・登録
          </Text>

          <InputGroup id="searchBooksPage__input" width="full" size="md" mb={4}>
            <Input
              type="text"
              p="1.5em"
              pr="6rem"
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
              flex="1"
            />
            <InputRightElement width="auto">
              <Button size="md" colorScheme="green" onClick={searchBooks}>
                <Search2Icon mr={2} />
                検索
              </Button>
            </InputRightElement>
          </InputGroup>

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          )}

          <UnorderedList
            id="searchBooksPage__list"
            spacing={6}
            m={0}
            styleType="none"
          >
            {loading ? (
              <ListItem
                color="blue.500"
                fontSize="xl"
                fontWeight="bold"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={4}
                h="100px"
              >
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="md"
                />
                <Box fontSize="md">{message}</Box>
              </ListItem>
            ) : paginatedBooks.length > 0 ? (
              paginatedBooks.map((book: gBookItem, index: number) => (
                <MotionListItem
                  key={book.etag}
                  layout
                  border="1px"
                  borderColor="gray.300"
                  borderRadius="md"
                  bg="white"
                  display={{ base: "block", md: "flex" }}
                  flexDirection="column"
                  alignItems="flex-start"
                  gap={{ base: 8, md: 6 }}
                  p={{ base: 5, md: 6 }}
                  minHeight="200px"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  _hover={{
                    boxShadow: "md",
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
                    id="searchBooksPage__description"
                    display="flex"
                    flexDirection="row"
                    alignItems="stretch"
                    gap={{ base: 4, md: 6 }}
                    mb={{ base: 6, md: 0 }}
                    w="full"
                    h="auto"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      p={2}
                      w={{ base: "35%", md: "25%" }}
                    >
                      {book.volumeInfo.imageLinks ? (
                        <Image
                          src={book.volumeInfo.imageLinks.thumbnail}
                          alt={book.volumeInfo.title}
                          w="full"
                          h="auto"
                        />
                      ) : (
                        <Image
                          src="/not_image.jpg"
                          alt="NOT IMAFGE"
                          w="full"
                          h="auto"
                        />
                      )}
                    </Box>
                    <Text
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
                      {book.volumeInfo.description
                        ? book.volumeInfo.description.substring(0, 60) + " ..."
                        : "掲載用のテキストデータがありません。"}
                    </Text>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent={{ base: "center", md: "flex-end" }}
                    w="full"
                  >
                    <Button
                      size="lg"
                      colorScheme="blue"
                      p="8"
                      onClick={() => {
                        registerBook(book);
                      }}
                      _hover={{
                        transform: "scale(1.01)",
                        transition: "transform 0.4s",
                      }}
                      _active={{ transform: "scale(0.95)" }}
                    >
                      この書籍を登録する
                    </Button>
                  </Box>
                </MotionListItem>
              ))
            ) : (
              <ListItem
                color="red.500"
                fontSize="xl"
                fontWeight="bold"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={4}
                h="100px"
              >
                {message}
              </ListItem>
            )}
          </UnorderedList>

          {totalPages > 1 && paginatedBooks.length > ITEMS_PER_PAGE / 2 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          )}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default SearchBooksPage;
