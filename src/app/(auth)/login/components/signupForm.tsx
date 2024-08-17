"use client";

import { FormEvent, useState } from "react";
import { Button, Text, VStack } from "@chakra-ui/react";

import { signup } from "../actions";
import { InputField } from "./inputField";

export const SignupForm = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
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
      <VStack id={`signup__inner`} w="100%">
        <form id={`signup__form`} className="w-full" onSubmit={handleSignup}>
          <VStack id={`signup__form__wrapper`} mx="auto" w="100%" spacing={12}>
            <VStack
              id={`login__form__input`}
              mx="auto"
              w="100%"
              spacing={4}
              alignItems="flex-start"
            >
              <InputField
                id="signup__form_nickname"
                label="ニックネーム"
                name="nickname"
                type="text"
                placeholder="ニックネームを入力してください"
                autocomplete="username"
              />
              <InputField
                id="signup__form__email"
                label="メールアドレス"
                name="email"
                type="email"
                placeholder="メールアドレスを入力してください"
                autocomplete="username"
              />
              <InputField
                id="signup__form__password"
                label="パスワード"
                name="password"
                type="password"
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
                width="100%"
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
        </form>
        {errorMessage && (
          <Text color="red.500" fontSize="md" fontWeight="bold" mt={4}>
            {errorMessage}
          </Text>
        )}
      </VStack>
    </>
  );
};
