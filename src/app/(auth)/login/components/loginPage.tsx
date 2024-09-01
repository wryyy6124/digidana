"use client";

import { useState } from "react";
import { Flex, VStack, Text } from "@chakra-ui/react";

import AppLogo from "@/app/components/logo";

import { LoginForm } from "./loginForm";
import { SignupForm } from "./signupForm";

const LoginPage = (): JSX.Element => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <>
      <Flex
        backgroundImage={`/bg.jpg`}
        backgroundSize="cover"
        backgroundPosition="center"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        w="full"
        minH="100vh"
      >
        <VStack
          bg="white"
          border="1px"
          borderColor="gray.400"
          rounded="md"
          p={8}
          w="full"
          maxWidth="xl"
        >
          <Flex justifyContent="center" mb={8} w="50%">
            <AppLogo />
          </Flex>
          {isLogin ? (
            <>
              <LoginForm />
              <Text
                onClick={toggleForm}
                cursor="pointer"
                color="blue.500"
                fontSize="xl"
                textAlign="center"
                mt={4}
                _hover={{ color: "teal.500", transition: "color 0.4s" }}
              >
                新規登録はこちら
              </Text>
            </>
          ) : (
            <>
              <SignupForm />
              <Text
                onClick={toggleForm}
                cursor="pointer"
                color="blue.500"
                fontSize="xl"
                textAlign="center"
                mt={4}
                _hover={{ color: "teal.500", transition: "color 0.4s" }}
              >
                アカウントをお持ちの方はこちら
              </Text>
            </>
          )}
        </VStack>
      </Flex>
    </>
  );
};

export default LoginPage;
