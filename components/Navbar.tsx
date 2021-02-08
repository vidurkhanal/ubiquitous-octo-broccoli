import { Box, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMyselfQuery } from "../generated/graphql";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ data, fetching }] = useMyselfQuery();
  let body;
  if (fetching) {
    body = null;
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={3}>Login </Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Create an account </Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Text as="h5" fontWeight="600" mr={5} cursor="pointer">
          {data.me.username}
        </Text>
        <Link>Logout </Link>
      </Flex>
    );
  }
  return (
    <Flex bg="twitter.600" height="50px" alignItems="center" pr="3">
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};
