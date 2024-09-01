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
  Flex,
  Heading,
} from "@chakra-ui/react";

import { Search2Icon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

import { register } from "../actions";
import MessageModal from "./messageModal";

import { useRouter } from "next/navigation";
import { AiOutlineFileSearch } from "react-icons/ai";

const ITEMS_PER_PAGE = 8;
const apiKey: gBooksAPI = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

const MotionListItem = motion(ListItem);

const SearchBooksPage = (): JSX.Element => {
  const router = useRouter();

  const [books, setBooks] = useState<gBookItem[]>([]);
  const [query, setQuery] = useState<string>("");
  const [searchMessage, setSearchMessage] = useState<string>("");
  const [searchFlag, setSearchFlag] = useState<boolean>(false);

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
    setSearchFlag(true);

    try {
      setBooks([]);
      setSearchMessage("検索中です🤓");

      if (query.length > 0) {
        setLoading(false);
      } else {
        setSearchMessage("検索ワードは1文字以上の入力が必要です🙏");
        return;
      }

      const res: Response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&maxResults=40&orderBy=relevance&filter=paid-ebooks&printType=books&langRestrict=ja`
      );

      if (!res.ok) {
        throw new Error(
          "データの取得に失敗しました。サーバーからの応答がありません。"
        );
      }

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
        setSearchMessage("なんの成果も！！得られませんでした！！😭");
        setBooks([]);
      } else {
        setSearchMessage("");
        setBooks(sortingBooks);
      }

      return;
    } catch (error) {
      console.error("エラーが発生しました:", error);

      setBooks([]);
      setQuery("");
      setSearchMessage("データの取得に失敗しました🙇‍♂️");
    }
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const onClose = () => setIsOpen(false);

  const registerBook = async (book: gBookItem) => {
    const result = await register(book);

    setModalMessage(result);
    setIsOpen(true);

    router.refresh();
  };

  return (
    <>
      <Header />
      <Box as="main" id={`seriesRegistration`} w="full" pt={100}>
        <Box
          id={`seriesRegistration`}
          mx="auto"
          p={8}
          pb={32}
          width="full"
          maxW="1024px"
        >
          <Heading
            as="h2"
            id={`volumesIdPage__header`}
            fontSize="2xl"
            fontWeight="bold"
            mb={4}
          >
            <AiOutlineFileSearch className="inline mr-2" />
            書籍検索
          </Heading>

          <InputGroup
            id="searchBooksPage__input"
            width="full"
            size="md"
            mb={10}
          >
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
            <InputRightElement width="auto" h="100%">
              <Button
                size="md"
                colorScheme="green"
                borderRadius="0 10px 10px 0"
                h="100%"
                onClick={searchBooks}
              >
                <Search2Icon mr={2} />
                検索
              </Button>
            </InputRightElement>
          </InputGroup>

          {searchFlag ? (
            <Box>
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
                    <Text fontSize="md">{searchMessage}</Text>
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
                      <Flex
                        id="searchBooksPage__info"
                        flexDirection="row"
                        flexWrap="wrap"
                        justifyContent="space-between"
                        alignItems="center"
                        flexGrow={1}
                        gap={{ base: 0, md: 4 }}
                        mb={{ base: 4, md: 0 }}
                      >
                        <Heading
                          as="h2"
                          color="gray.700"
                          fontWeight="bold"
                          fontSize={{ base: "xl", md: "2xl" }}
                        >
                          {book.volumeInfo.title.trim()}
                        </Heading>
                        <Box
                          display={{ base: "none", md: "flex" }}
                          flexDirection="row"
                          flexWrap="wrap"
                          gap={6}
                        >
                          {book.volumeInfo.authors && (
                            <Text
                              fontStyle="italic"
                              fontSize="sm"
                              color="gray.500"
                            >
                              著者：{book.volumeInfo.authors?.join(", ")}
                            </Text>
                          )}
                          {book.volumeInfo.publishedDate && (
                            <Text
                              fontStyle="italic"
                              fontSize="sm"
                              color="gray.500"
                            >
                              発売日：
                              <time>{book.volumeInfo.publishedDate}</time>
                            </Text>
                          )}
                        </Box>
                      </Flex>
                      <Flex
                        id="searchBooksPage__description"
                        flexDirection="row"
                        alignItems="stretch"
                        gap={{ base: 4, md: 6 }}
                        mb={{ base: 6, md: 0 }}
                        w="full"
                        h="auto"
                      >
                        <Flex
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
                        </Flex>
                        <Text
                          border="1px"
                          borderColor="gray.300"
                          color="gray.700"
                          display="flex"
                          alignItems={"center"}
                          fontSize={{ base: "sm", md: "xl" }}
                          textAlign="left"
                          p={{ base: 5, md: 10 }}
                          overflow="hidden"
                          overflowWrap="break-word"
                          whiteSpace="pre-wrap"
                          w={{ base: "65%", md: "100%" }}
                        >
                          {book.volumeInfo.description ? (
                            book.volumeInfo.description.substring(0, 60) +
                            "(略)"
                          ) : (
                            <Box
                              as="span"
                              color="gray.400"
                              fontSize="sm"
                              fontStyle="italic"
                            >
                              掲載用のテキストデータがないようです🤔
                            </Box>
                          )}
                        </Text>
                      </Flex>
                      <Flex
                        justifyContent={{ base: "center", md: "flex-end" }}
                        w="full"
                      >
                        <Button
                          backgroundColor="blue.400"
                          color="white"
                          position="relative"
                          overflow="hidden"
                          p="0"
                          w="fit-content"
                          h="auto"
                          onClick={() => {
                            registerBook(book);
                          }}
                          _before={{
                            backgroundColor: "blue.700",
                            content: `""`,
                            display: "inline-block",
                            transition: "0.5s",
                            position: "absolute",
                            top: "0",
                            right: "100%",
                            w: "100%",
                            h: "100%",
                          }}
                          _hover={{
                            _before: { right: "0" },
                          }}
                        >
                          <Box
                            as="span"
                            color="white"
                            display="block"
                            zIndex="1"
                            py={4}
                            px={8}
                            w="100%"
                            h="auto"
                          >
                            この書籍を登録する
                          </Box>
                        </Button>
                      </Flex>
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
                    {searchMessage}
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
          ) : (
            <Text>ここに検索方法書いてくよ</Text>
          )}
        </Box>
      </Box>
      <Footer />
      <MessageModal isOpen={isOpen} onClose={onClose} message={modalMessage} />
    </>
  );
};

export default SearchBooksPage;
