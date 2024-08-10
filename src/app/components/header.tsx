import { Box, Link } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box
      as="header"
      width="100%"
      id={`header`}
      className={`bg-neutral-50 z-10 sticky top-0`}
    >
      <Box
        mx="auto"
        p={4}
        width="100%"
        maxW="1024px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        id={`header__inner`}
      >
        <h1 id={`header__logo`} className={`text-center inline-block`}>
          <Link href={`/`}>
            <span className={`block font-bold text-2xl`}>📚デジダナ!!</span>
            <span className={`block text-base`}>- Digital Hondana -</span>
          </Link>
        </h1>
        <nav id={`header__navi`}>メニュー</nav>
      </Box>
    </Box>
  );
};

export default Header;
