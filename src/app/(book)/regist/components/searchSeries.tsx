"use client";

import { useState } from "react";

import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import Image from "next/image";
import { Search2Icon } from "@chakra-ui/icons";

export default function SearchSeries(): JSX.Element {
  const [books, setBooks] = useState<gBookItem[]>([]);
  const [query, setQuery] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const searchSeriesBook = async (): Promise<void> => {
    if (query === "") {
      setMessage("😴");
      return;
    }

    setBooks([]);
    setMessage(null);

    const apiKey: string | undefined =
      process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

    const res: Response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}+intitle:1&key=${apiKey}&maxResults=6&orderBy=relevance&langRestrict=ja`
    );

    const data: gBookType = await res.json();

    const comic: gBookItem[] = Array.from(
      new Set(data.items.map((item) => item.volumeInfo.title))
    )
      .map((title) =>
        data.items.find((item) => item.volumeInfo.title === title)
      )
      .filter(
        (item): item is gBookItem =>
          item !== undefined && item.volumeInfo.title.includes(query)
      )
      .sort((a, b) => a.volumeInfo.title.localeCompare(b.volumeInfo.title));

    if (comic.length === 0) {
      setMessage("該当する書籍が見つかりませんでした...");
    }

    setBooks(comic);
  };

  return (
    <Box id={`searchSeries__body`} width="100%">
      <Box id={`searchSeries__inner`} mx="auto" width="100%" maxW="1024px">
        <InputGroup id={`searchSeries__input`} size="md">
          <Input
            type="text"
            pr="4.8rem"
            placeholder="検索したい書籍名を入力してください。"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button size="sm" colorScheme="green" onClick={searchSeriesBook}>
              <Search2Icon mr={1} />
              検索
            </Button>
          </InputRightElement>
        </InputGroup>

        <ol className="flex flex-col items-stretch gap-6 pt-10">
          {message ? (
            <li className="text-red-500 text-sm font-bold">{message}</li>
          ) : books.length > 0 ? (
            books.map((book: gBookItem) => (
              <li
                key={book.etag}
                className="flex gap-6 flex-col items-center items-stretch rounded-lg bg-neutral-100 p-6"
              >
                <div
                  className={`grow flex flex-row flex-wrap items-center gap-8`}
                >
                  <h2 className={`font-bold text-xl`}>
                    {book.volumeInfo.title.trim()}
                  </h2>

                  <div className={`flex flex-row flex-wrap gap-6`}>
                    {book.volumeInfo.authors ? (
                      <p className={`italic text-sm`}>
                        <span>著者：{book.volumeInfo.authors?.join(", ")}</span>
                      </p>
                    ) : null}
                    {book.volumeInfo.publishedDate ? (
                      <p className={`italic text-sm`}>
                        <span>
                          発売日：<time>{book.volumeInfo.publishedDate}</time>
                        </span>
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className={`flex items-center gap-6`}>
                  <div className={`flex-none`}>
                    {book.volumeInfo.imageLinks ? (
                      <Image
                        src={book.volumeInfo.imageLinks.thumbnail}
                        alt={book.volumeInfo.title}
                        width={128}
                        height={175}
                      />
                    ) : (
                      <Box
                        width={128}
                        height={175}
                        className={`flex flex-col justify-center bg-gray-300 text-center italic p-4`}
                      >
                        <span className={`block`}>Not</span>
                        <span className={`block`}>Image</span>
                      </Box>
                    )}
                  </div>

                  <p className={`grow bg-white p-6 text-base`}>
                    {book.volumeInfo.description ? (
                      book.volumeInfo.description.substring(0, 70) + " ..."
                    ) : (
                      <span className={`italic text-xs text-slate-400`}>
                        掲載データがありません。
                      </span>
                    )}
                  </p>

                  <div className={`flex-none flex flex-col justify-center`}>
                    <Button
                      size="md"
                      colorScheme="teal"
                      onClick={() => {
                        console.log(`あああ`);
                      }}
                    >
                      登録
                    </Button>
                  </div>
                </div>
              </li>
            ))
          ) : null}
        </ol>
      </Box>
    </Box>
  );
}
