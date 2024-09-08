"use client";

import { Box, Link, ListItem, OrderedList, Text } from "@chakra-ui/react";

const SearchSummaryParts = (): JSX.Element => (
  <Box
    bg="white"
    boxShadow="md"
    borderWidth={1}
    borderColor="gray.300"
    borderRadius="md"
    fontSize="md"
    p={6}
  >
    <Box _notLast={{ marginBottom: 6 }}>
      <Text as="h3" fontSize="xl" fontWeight="bold" mb={3}>
        機能概要
      </Text>
      <Text as="p">
        <Link
          href={`https://developers.google.com/books?hl=ja`}
          color="blue.400"
          fontWeight="bold"
          transition="0.4s"
          _hover={{
            color: "red.400",
          }}
        >
          Google Books API
        </Link>
        （以下、API）を活用して、書籍情報を検索し自分だけのデジタル本棚を作成できます。
      </Text>
    </Box>
    <Box _notLast={{ marginBottom: 6 }}>
      <Text as="h3" fontSize="xl" fontWeight="bold" mb={3}>
        使用手順
      </Text>
      <OrderedList mb={3}>
        <ListItem _notLast={{ marginBottom: 2 }}>
          検索バーへ書籍のタイトルを入力してください。
        </ListItem>
        <ListItem _notLast={{ marginBottom: 2 }}>
          検索ボタンを押すとAPIから取得した検索結果が表示（最大40件）されます。
        </ListItem>
        <ListItem _notLast={{ marginBottom: 2 }}>
          一覧から追加したい対象書籍の登録ボタンを押下してください。
        </ListItem>
        <ListItem _notLast={{ marginBottom: 2 }}>
          トップ画面のマイライブラリ一覧へ書籍データが追加されます！
        </ListItem>
      </OrderedList>
    </Box>
    <Box _notLast={{ marginBottom: 6 }}>
      <Text as="h3" fontSize="xl" fontWeight="bold" mb={3}>
        注意事項
      </Text>
      <Box>
        <Text
          as="p"
          fontSize="sm"
          color="red.500"
          _notLast={{ marginBottom: 1 }}
        >
          ※APIは1日あたりのリクエスト数に限りがあります。リクエストの乱用はご遠慮ください😞
        </Text>
        <Text
          as="p"
          fontSize="sm"
          color="red.500"
          _notLast={{ marginBottom: 1 }}
        >
          ※APIの仕様で曖昧検索が出来ない為、目的のデータが見つかるとは限りません😞
        </Text>
      </Box>
    </Box>
  </Box>
);

export default SearchSummaryParts;
