"use client";

import { Button, Flex } from "@chakra-ui/react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  handlePageChange,
}: PaginationProps): JSX.Element => (
  <Flex justifyContent="center" flexWrap="wrap" gap={4} py={10} w="full">
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
  </Flex>
);

export default Pagination;
