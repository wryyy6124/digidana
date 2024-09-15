"use client";

import React, { useState } from "react";
import { Box, Text, Input, Button, Flex, Link } from "@chakra-ui/react";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

import { supabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { BsInfoSquareFill } from "react-icons/bs";
import { LuClipboardEdit } from "react-icons/lu";

const SeriesIdPage = ({
  seriesData,
}: {
  seriesData: seriesType[];
}): JSX.Element => {
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
        py={{
          base: 100,
          md: 120,
        }}
        w="full"
        minH="100%"
      >
        <Box
          id={`SeriesIdPage__inner`}
          mx="auto"
          px={{
            base: 4,
            md: 8,
          }}
          w="full"
          maxW="1280px"
        >
          <Flex
            justifyContent="space-between"
            mb={{
              base: 5,
              md: 10,
            }}
          >
            <Text
              as="h2"
              id={`SeriesIdPage__header`}
              display="inline-flex"
              alignItems="center"
              gap={4}
              fontSize={{
                base: "2xl",
                lg: "3xl",
              }}
              fontWeight="bold"
            >
              <LuClipboardEdit />
              シリーズ名編集
            </Text>
          </Flex>

          <Box
            border="2px solid #888"
            borderRadius={10}
            bg="white"
            color="black"
            fontSize="2xl"
            fontWeight="bold"
            p={{
              base: 2,
              md: 4,
              xl: 6,
            }}
          >
            {!(Object.keys(seriesData).length === 0) ? (
              seriesData.map((data) => (
                <Box
                  key={data.series_id}
                  bg="white"
                  fontSize={{
                    base: "sm",
                    md: "md",
                    lg: "xl",
                  }}
                  p={{
                    base: 2,
                    md: 4,
                  }}
                  _notLast={{
                    borderBottomWidth: 1,
                    borderBottomStyle: "dashed",
                  }}
                >
                  {editSeriesId === data.series_id ? (
                    <Flex alignItems="center" gap={2}>
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
                        fontSize="sm"
                      >
                        戻る
                      </Button>
                    </Flex>
                  ) : (
                    <Flex alignItems="center" gap={4}>
                      <Text
                        p={{
                          base: 0,
                          md: 2,
                        }}
                        w="full"
                      >
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
