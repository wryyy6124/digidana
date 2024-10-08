"use client";

import React from "react";
import { Flex, Link, Text } from "@chakra-ui/react";

import { BsInfoSquareFill } from "react-icons/bs";

const NotRegistered = (): JSX.Element => {
  return (
    <Flex
      flexFlow="column"
      gap={5}
      border="2px solid #888"
      borderRadius={10}
      bg="white"
      color="black"
      fontSize="2xl"
      fontWeight="bold"
      p={6}
    >
      <Text as="p">
        <BsInfoSquareFill className="inline mr-2" />
        登録済みの書籍データがまだありません。
      </Text>
      <Text as="p">
        <Link href={`./search`} color="blue.500">
          こちら
        </Link>
        から書籍の検索～登録を行なって自分だけのデジタル本棚を作ろう！！
      </Text>
    </Flex>
  );
};

export default NotRegistered;
