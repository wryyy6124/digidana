"use client";

import React from "react";
import { Flex, Spinner, Text } from "@chakra-ui/react";

const Loading = (): JSX.Element => {
  return (
    <Flex
      id={`loading`}
      bg="rgb(10, 10, 10, 0.96)"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      top={0}
      left={0}
      zIndex="5"
      w="full"
      h="100vh"
      minHeight="100vh"
    >
      <Flex
        id={`loading__wrapper`}
        textAlign="center"
        justifyContent="center"
        alignItems="center"
        flexFlow="column"
        gap={3}
      >
        <Spinner
          id={`loading__body`}
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="red.500"
          size="xl"
        />
        <Text
          as="span"
          id={`loading__text`}
          color="white"
          fontSize="3xl"
          fontWeight="bold"
          letterSpacing="0.1em"
          _firstLetter={{
            color: "red.500",
          }}
        >
          Now Loading ...
        </Text>
      </Flex>
    </Flex>
  );
};

export default Loading;
