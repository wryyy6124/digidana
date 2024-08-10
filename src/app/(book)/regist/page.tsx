import React from "react";

import SearchSeries from "./components/searchSeries";
import { Box } from "@chakra-ui/react";

export default function SeriesRegistrationPage() {
  return (
    <Box id={`searchSeries`} width="100%">
      <h2 id={`searchSeries__header`} className={`font-bold text-2xl mb-4`}>
        シリーズ検索
      </h2>
      <SearchSeries />
    </Box>
  );
}
