import Head from "next/head";
import { Navbar } from "../components/Navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";
import { useState } from "react";

function Home() {
  const [variables, setVariables] = useState<{
    limit: number;
    cursor: null | string;
  }>({ limit: 10, cursor: null });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });
  const router = useRouter();

  if (!fetching && !data) {
    return (
      <>
        <Head>
          <title>Oops!! </title>
        </Head>
        <Flex h="100vh" w="100vw" alignItems="center" justifyContent="center">
          <Heading size="xl" textAlign="center" px="3">
            Oops !! Some kind of error occured. Check your network settings.
          </Heading>
        </Flex>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Braket Something</title>
      </Head>
      <Layout variant="regular">
        <Flex mb="10" alignItems="center" justifyContent="space-between">
          <Heading fontSize="4xl">Braket Something</Heading>
          <Button
            colorScheme="orange"
            onClick={() => {
              router.push("/create-post");
            }}
          >
            Create New Post
          </Button>
        </Flex>
        {data ? (
          <Stack spacing={8}>
            {data.AllPosts.map((post) => (
              <Box p={5} shadow="md" borderWidth="1px" key={post.id}>
                <Heading fontSize="xl">{post.title}</Heading>
                <Text mt={4}>{post.textSnippet}</Text>
              </Box>
            ))}
            <Button
              my="10"
              colorScheme="orange"
              isLoading={fetching}
              onClick={() => {
                setVariables({
                  limit: variables.limit,
                  cursor: data.AllPosts[data.AllPosts.length - 1].createdAt,
                });
              }}
            >
              Load More
            </Button>
          </Stack>
        ) : (
          <Text>Loading...</Text>
        )}
      </Layout>
    </>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
