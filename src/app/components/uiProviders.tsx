"use client";

import { ChakraProvider } from "@chakra-ui/react";

export function ChakuraUIProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
