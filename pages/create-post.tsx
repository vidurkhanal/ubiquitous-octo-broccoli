import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const CreatePost: React.FC<{}> = ({}) => {
  const [, CreatePost] = useCreatePostMutation();
  const router = useRouter();
  return (
    <Layout variant="small">
      <Head>
        <title>Create A New Post</title>
      </Head>
      <Formik
        initialValues={{ title: "", content: "" }}
        onSubmit={async (val, { setErrors }) => {
          const { error } = await CreatePost(val);
          if (!error) router.push("/");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="Post Title"
              label="Enter title of the post"
              type="text"
              isRequired={true}
            />
            <Box h="20px" />
            <InputField
              textarea={true}
              name="content"
              placeholder="Description"
              label="Post Description"
              type="text"
              isRequired={true}
            />
            <Button
              mt="4"
              variant="solid"
              color="linkedin.900"
              type="submit"
              isLoading={isSubmitting}
            >
              Create A Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
