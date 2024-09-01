"use client";

import { Box, Button } from "@chakra-ui/react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  handlePageChange,
}: PaginationProps) => (
  <Box
    display="flex"
    justifyContent="center"
    flexWrap="wrap"
    gap={2}
    mt={8}
    pb={8}
    w="full"
  >
    {[...Array(totalPages)].map((_, i) => (
      <Button
        key={i}
        onClick={() => handlePageChange(i + 1)}
        isDisabled={currentPage === i + 1}
        colorScheme={currentPage === i + 1 ? "blue" : "gray"}
        flexShrink={1}
      >
        {i + 1}
      </Button>
    ))}
  </Box>
);

export default Pagination;
