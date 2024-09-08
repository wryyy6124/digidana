"use client";

import { FormEvent, useEffect, useState } from "react";
import { Box, Button, Text, VStack } from "@chakra-ui/react";

import { login } from "../actions";
import { InputField } from "./inputField";

import Loading from "@/app/components/loading";

export const LoginForm = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage(null);

    const formData: FormData = new FormData(e.currentTarget);
    const error: string | null = await login(formData);

    error ? alert(error) : "";
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <VStack id={`login__inner`} w="full" maxWidth="xl">
        <Box as="form" onSubmit={handleLogin} id={`login__form`} w="full">
          <VStack id={`login__form__wrapper`} mx="auto" w="full" spacing={12}>
            <VStack
              id={`login__form__input`}
              alignItems="flex-start"
              spacing={4}
              mx="auto"
              w="full"
            >
              <InputField
                type="email"
                id={`login__form__email`}
                label="メールアドレス"
                name="email"
                placeholder="メールアドレスを入力してください"
                autocomplete="username"
              />
              <InputField
                type="password"
                id={`login__form__password`}
                label="パスワード"
                name="password"
                placeholder="パスワードを入力してください"
                autocomplete="current-password"
              />
            </VStack>
            <VStack id={`login__form__button`} mx="auto" w="80%" spacing={4}>
              <Button
                type="submit"
                bg="blue.400"
                borderRadius="md"
                color="white"
                fontSize="xl"
                fontWeight="bold"
                transition="transform 0.15s ease-in-out"
                p={8}
                w="full"
                _hover={{
                  bg: "indigo.700",
                  transform: "scale(1.05)",
                }}
                _active={{
                  transform: "scale(0.95)",
                }}
                _focus={{
                  outline: "none",
                  boxShadow: "outline",
                }}
                isLoading={isLoading}
                loadingText="ログイン処理中…"
              >
                ログイン
              </Button>
            </VStack>
          </VStack>
        </Box>
      </VStack>
      {errorMessage && (
        <Text color="red.500" fontSize="md" fontWeight="bold" mt={4}>
          {errorMessage}
        </Text>
      )}
    </>
  );
};
