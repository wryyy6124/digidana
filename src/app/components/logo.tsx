import React from "react";
import Link from "next/link";
import { Text } from "@chakra-ui/react";

const AppLogo = (): JSX.Element => {
  return (
    <Text as="h1" id={`pages__logo`} className={`text-center inline-block`}>
      <Link href={`/`}>
        <span className={`block font-bold text-2xl`}>📚デジダナ!!</span>
        <span className={`block text-base`}>- Digital Hondana -</span>
      </Link>
    </Text>
  );
};

export default AppLogo;
