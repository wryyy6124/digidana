"use client";

import React, { useEffect, useState } from "react";
import { Box, Text, Input, Button, Flex, FormLabel } from "@chakra-ui/react";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

import { useRouter } from "next/navigation";
import { supabaseClient } from "@/utils/supabase/client";
import { User } from "@supabase/auth-js";

import Loading from "@/app/components/loading";
import { FaCircleUser } from "react-icons/fa6";

interface ProfileProps {
  user: User;
  profile: {
    nick_name: string | null;
  };
}

const ProfilePage: React.FC<ProfileProps> = ({
  user,
  profile,
}): JSX.Element => {
  const router = useRouter();
  const supabase = supabaseClient();

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const isPasswordValid: string = currentPassword && newPassword;

  const handlePasswordChange = async (): Promise<void> => {
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email as string,
        password: currentPassword as string,
      });

      if (signInError) {
        console.error("現在のパスワードが間違っています", signInError);
        alert(`現在のパスワードが間違っています。${signInError}`);

        setCurrentPassword("");
        setNewPassword("");

        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword as string,
      });

      if (updateError) {
        console.error("パスワードの更新に失敗しました", updateError);
        alert(`パスワードの更新に失敗しました。${updateError}`);

        setCurrentPassword("");
        setNewPassword("");

        return;
      }

      alert("パスワードが正常に更新されました。トップページへ遷移します");
    } catch (error) {
      console.error("パスワード変更中にエラーが発生しました", error);
    }

    router.push("/");
  };

  const [nickName, setNickName] = useState<string | null>(profile.nick_name);

  const handleNickNameChange = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ nick_name: nickName })
      .eq("user_id", user.id);

    if (error) {
      console.error("Error updating nickname:", error);
    }

    alert("ニックネームの変更が完了しました！トップページへ遷移します。");
    router.push("/");
  };

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Header />
      <Box
        as="main"
        id={`profilePage`}
        bg="linear-gradient(135deg, #f7fafc 25%, #fdfdfd 25%, #fdfdfd 50%, #f7fafc 50%, #f7fafc 75%, #fdfdfd 75%, #fdfdfd 100%)"
        backgroundSize="1000px 1000px"
        backgroundPosition="center"
        w="full"
        minH="100%"
        py={120}
      >
        <Box id={`profilePage__inner`} mx="auto" px={8} w="full" maxW="1280px">
          <Text as="h2" fontSize="3xl" fontWeight="bold" mb={10}>
            <Flex alignItems="center" gap={2}>
              <FaCircleUser />
              ユーザ情報
            </Flex>
          </Text>

          <Box
            bg="white"
            borderWidth="1px"
            borderColor="gray.300"
            borderRadius="md"
            boxShadow="md"
            p={{ base: "4", md: "10" }}
          >
            <Box
              borderBottomWidth="1px"
              borderBottomStyle="dashed"
              borderBottomColor="gray.300"
              _notLast={{
                marginBottom: 12,
                paddingBottom: 12,
              }}
            >
              <Box mb={10}>
                <FormLabel
                  htmlFor="nickname"
                  color="gray.700"
                  fontSize="xl"
                  fontWeight="bold"
                  mb={3}
                >
                  ニックネーム
                </FormLabel>
                <Input
                  id={`nickname`}
                  bg="white"
                  value={nickName ?? ""}
                  onChange={(e) => setNickName(e.target.value)}
                />
              </Box>
              <Flex justify="flex-end">
                <Button onClick={handleNickNameChange} colorScheme="blue">
                  ニックネームを更新
                </Button>
              </Flex>
            </Box>
            <Box
              _notLast={{
                marginBottom: 12,
                paddingBottom: 12,
              }}
            >
              <Box mb={10}>
                <Box _notLast={{ marginBottom: 3 }}>
                  <FormLabel
                    htmlFor="currentPassword"
                    color="gray.700"
                    fontSize="xl"
                    fontWeight="bold"
                    mb={2}
                  >
                    現在のパスワード
                  </FormLabel>
                  <Input
                    id={`currentPassword`}
                    bg="white"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value.trim())}
                  />
                </Box>
                <Box _notLast={{ marginBottom: 3 }}>
                  <FormLabel
                    htmlFor="newPassword"
                    color="gray.700"
                    fontSize="xl"
                    fontWeight="bold"
                    mb={2}
                  >
                    新しいパスワード
                  </FormLabel>
                  <Input
                    id={`newPassword`}
                    bg="white"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value.trim())}
                  />
                </Box>
              </Box>
              <Flex justify="flex-end">
                <Button
                  onClick={handlePasswordChange}
                  isDisabled={!isPasswordValid}
                  colorScheme={isPasswordValid ? "red" : "gray"}
                >
                  パスワードを更新
                </Button>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ProfilePage;
