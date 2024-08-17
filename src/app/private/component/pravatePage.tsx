"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { supabaseClient } from "@/utils/supabase/client";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { Box } from "@chakra-ui/react";

export default function PravatePage() {
  const [mail, setMail] = useState<string | null>("");
  const [name, setName] = useState<string | null>("");

  const supabase = supabaseClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!user || error) {
        redirect("/login");
      }

      setMail(user?.email || "");
    };

    const getName = async () => {
      const { data, error } = await supabase.from("profiles").select("*");

      if (error) {
        console.error("Error fetching profiles:", error.message);
        return;
      }

      console.log("Fetched profiles:", data);
      setName(data[0].nick_name || "");
    };

    getUser();
    getName();
  }, [supabase]);

  return (
    <>
      <Header />
      <Box as="main" id={`seriesRegistration`} width="100%">
        <Box
          id={`seriesRegistration`}
          mx="auto"
          p={8}
          pb={32}
          width="100%"
          maxW="1024px"
        >
          {mail ? <p>【Email】 {mail}</p> : <p>Loading...</p>}
          {name ? <p>こんにちは、 {name}さん</p> : <p>Loading...</p>}
        </Box>
      </Box>
      <Footer />
    </>
  );
}
