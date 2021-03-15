import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation, useMyselfQuery } from "../generated/graphql";

interface NavbarProps {}

const isServer = () => {
  return typeof window === "undefined";
};

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMyselfQuery({
    pause: isServer(),
  });
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
        <Text as="h5" fontWeight="600" mr={5} cursor="pointer" color="white">
          {data.me.username}
        </Text>
        <Button
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
          variant="link"
          colorScheme="messenger"
        >
          Logout{" "}
        </Button>
      </Flex>
    );
  }
  return (
    <Flex
      zIndex={1}
      position="sticky"
      top={0}
      bg="whatsapp.400"
      height="60px"
      alignItems="center"
      pr="3"
    >
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};
