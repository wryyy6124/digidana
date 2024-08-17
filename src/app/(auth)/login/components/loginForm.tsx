"use client";

import { FormEvent, useState } from "react";
import { Button, Text, VStack } from "@chakra-ui/react";

import { login } from "../actions";
import { InputField } from "./inputField";

export const LoginForm = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const formData: FormData = new FormData(e.currentTarget);
    const error: string | null = await login(formData);

    setIsLoading(false);
    error ? alert(error) : "";
  };

  return (
    <>
      <VStack id={`login__inner`} w="100%" maxWidth="xl">
        <form id={`login__form`} className="w-full" onSubmit={handleLogin}>
          <VStack id={`login__form__wrapper`} mx="auto" w="100%" spacing={12}>
            <VStack
              id={`login__form__input`}
              mx="auto"
              w="100%"
              spacing={4}
              alignItems="flex-start"
            >
              <InputField
                id="login__form__email"
                label="メールアドレス"
                name="email"
                type="email"
                placeholder="メールアドレスを入力してください"
                autocomplete="username"
              />
              <InputField
                id="login__form__password"
                label="パスワード"
                name="password"
                type="password"
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
                width="100%"
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
        </form>
      </VStack>
      {errorMessage && (
        <Text color="red.500" fontSize="md" fontWeight="bold" mt={4}>
          {errorMessage}
        </Text>
      )}
    </>
  );
};
