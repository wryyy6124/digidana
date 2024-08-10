import { Box } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      width="100%"
      id={`footer`}
      className={`fixed bottom-0 bg-neutral-50`}
    >
      <Box
        mx="auto"
        p={6}
        width="100%"
        maxW="1024px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        id={`footer__inner`}
      >
        <p id={`footer__copylight`}>
          <strong>digidana &copy;K.T</strong>
        </p>
      </Box>
    </Box>
  );
};

export default Footer;
