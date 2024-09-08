"use client";

import React, { useState } from "react";
import { Box, Text, Input, Button, Flex, Link } from "@chakra-ui/react";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

import { supabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { BsInfoSquareFill } from "react-icons/bs";
import { LuClipboardEdit } from "react-icons/lu";

interface seriesProps {
  seriesData: {
    created_at: string;
    user_id: string;
    series_id: string;
    series_title: string;
    id: string;
  }[];
}

const SeriesIdPage = ({ seriesData }: seriesProps): JSX.Element => {
  const router = useRouter();
  const supabase = supabaseClient();

  const [editSeriesId, setEditSeriesId] = useState<string | null>(null);
  const [newSeriesTitle, setNewSeriesTitle] = useState<string>("");

  const handleEditTitle = (series_id: string, currentTitle: string) => {
    setEditSeriesId(series_id);
    setNewSeriesTitle(currentTitle);
  };

  const handleSaveTitle = async (): Promise<void> => {
    if (!editSeriesId) return;

    try {
      const { error } = await supabase
        .from("series")
        .update({ series_title: newSeriesTitle })
        .eq("series_id", editSeriesId);

      if (error) throw error;

      setEditSeriesId(null);
      router.refresh();
    } catch (error) {
      console.error("Error saving series title:", error);
    }
  };

  return (
    <>
      <Header />
      <Box
        as="main"
        id={`SeriesIdPage`}
        bg="linear-gradient(90deg, #f7fafc 25%, #fdfdfd 25%, #fdfdfd 50%, #f7fafc 50%, #f7fafc 75%, #fdfdfd 75%, #fdfdfd 100%)"
        backgroundSize="1000px 1000px"
        backgroundPosition="center"
        w="full"
        minH="100%"
        py={120}
      >
        <Box id={`SeriesIdPage__inner`} mx="auto" px={8} w="full" maxW="1280px">
          <Text
            as="h2"
            id={`SeriesIdPage__header`}
            display="inline-flex"
            alignItems="center"
            fontSize="3xl"
            fontWeight="bold"
            mb={10}
          >
            <LuClipboardEdit />
            シリーズ名編集
          </Text>

          <Box
            border="2px solid #888"
            borderRadius={10}
            bg="white"
            color="black"
            fontSize="2xl"
            fontWeight="bold"
            p={6}
          >
            {!(Object.keys(seriesData).length === 0) ? (
              seriesData.map((data) => (
                <Box
                  key={data.series_id}
                  bg="white"
                  fontSize="xl"
                  p={4}
                  _notLast={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dashed",
                  }}
                >
                  {editSeriesId === data.series_id ? (
                    <Flex alignItems="center" gap={4}>
                      <Input
                        value={newSeriesTitle}
                        onChange={(e) => setNewSeriesTitle(e.target.value)}
                        bg="white"
                      />
                      <Button onClick={handleSaveTitle} colorScheme="blue">
                        保存
                      </Button>
                      <Button
                        onClick={() => setEditSeriesId(null)}
                        colorScheme="gray"
                      >
                        キャンセル
                      </Button>
                    </Flex>
                  ) : (
                    <Flex alignItems="center" gap={4}>
                      <Text p={2} w="full">
                        {data.series_title}
                      </Text>
                      <Button
                        onClick={() =>
                          handleEditTitle(data.series_id, data.series_title)
                        }
                        colorScheme="teal"
                      >
                        編集
                      </Button>
                    </Flex>
                  )}
                </Box>
              ))
            ) : (
              <Flex
                flexFlow="column"
                gap={5}
                bg="white"
                color="black"
                fontSize="2xl"
                fontWeight="bold"
              >
                <Text>
                  <BsInfoSquareFill className="inline mr-2" />
                  登録済みのシリーズデータがありません...
                </Text>
                <Text as="p">
                  <Link href={`./search`} color="blue.500">
                    こちら
                  </Link>
                  からデータをご登録いただくとシリーズ物の書籍が追加されます！
                </Text>
              </Flex>
            )}
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default SeriesIdPage;
