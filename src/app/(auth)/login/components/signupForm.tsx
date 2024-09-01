"use client";

import { FormEvent, useState } from "react";
import { Box, Button, Text, VStack } from "@chakra-ui/react";

import { signup } from "../actions";
import { InputField } from "./inputField";

export const SignupForm = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignup = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage(null);

    const formData: FormData = new FormData(e.currentTarget);
    const err: string | null = await signup(formData);

    setIsLoading(false);
    err ? alert(err) : "";
  };

  return (
    <>
      <VStack id={`signup__inner`} w="full">
        <Box as="form" id={`signup__form`} onSubmit={handleSignup} w="full">
          <VStack id={`signup__form__wrapper`} mx="auto" w="full" spacing={12}>
            <VStack
              id={`login__form__input`}
              spacing={4}
              alignItems="flex-start"
              mx="auto"
              w="full"
            >
              <InputField
                type="text"
                id={`signup__form_nickname`}
                label="ニックネーム"
                name="nickname"
                placeholder="ニックネームを入力してください"
              />
              <InputField
                type="email"
                id={`signup__form__email`}
                label="メールアドレス"
                name="email"
                placeholder="メールアドレスを入力してください"
                autocomplete="username"
              />
              <InputField
                type="password"
                id={`signup__form__password`}
                label="パスワード"
                name="password"
                placeholder="パスワードを入力してください"
                autocomplete="new-password"
              />
            </VStack>
            <VStack id={`signup__form__button`} mx="auto" w="80%" spacing={4}>
              <Button
                type="submit"
                bg="green.400"
                borderRadius="md"
                color="white"
                fontSize="xl"
                fontWeight="bold"
                transition="transform 0.15s ease-in-out"
                p={8}
                w="full"
                _hover={{
                  bg: "green.500",
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
                loadingText="登録処理中…"
              >
                新規登録
              </Button>
            </VStack>
          </VStack>
        </Box>
        {errorMessage && (
          <Text color="red.500" fontSize="md" fontWeight="bold" mt={4}>
            {errorMessage}
          </Text>
        )}
      </VStack>
    </>
  );
};
