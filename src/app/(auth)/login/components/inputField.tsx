"use client";

import { Box, FormLabel, Input } from "@chakra-ui/react";

type InputFieldProps = {
  id: string;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  autocomplete?: string | undefined;
};

export const InputField = ({
  id,
  label,
  name,
  type,
  placeholder,
  autocomplete,
}: InputFieldProps): JSX.Element => (
  <Box w="full">
    <FormLabel
      htmlFor={id}
      color="gray.700"
      fontSize="md"
      fontWeight="bold"
      mb={3}
    >
      {label}
    </FormLabel>
    <Input
      id={id}
      name={name}
      type={type}
      required
      borderRadius="md"
      boxShadow="sm"
      color="gray.900"
      fontSize="sm"
      p={6}
      ring="1px"
      ringColor="gray.300"
      placeholder={placeholder}
      _placeholder={{ color: "gray.400" }}
      _focus={{
        ring: "2px",
        ringInset: "true",
        ringColor: "indigo.600",
        transform: "scale(1.05)",
        transition: "transform 0.2s",
      }}
      autoComplete={autocomplete}
    />
  </Box>
);
