import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { Box, Button, Link } from "@chakra-ui/react";
import { useRegisterMutation } from "../generated/graphql";
import toErrorMap from "../utils/toErrorMap";
import { useRouter } from "next/router";
import Head from "next/head";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";

interface registerProps {}

const register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Head>
        <title>Create An Account</title>
      </Head>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (val, { setErrors }) => {
          const response = await register(val);
          if (response.data?.RegisterUser.error) {
            setErrors({ ...toErrorMap(response.data.RegisterUser.error) });
          } else if (response.data?.RegisterUser.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="Email Address"
              label="Enter Your Email Address"
              type="email"
              isRequired={true}
            />
            <Box h="20px" />
            <InputField
              name="password"
              placeholder="Password"
              label="Enter Your Password"
              type="password"
              isRequired={true}
            />
            <Button
              mt="4"
              variant="solid"
              color="telegram.500"
              type="submit"
              isLoading={isSubmitting}
            >
              Create An Account
            </Button>
          </Form>
        )}
      </Formik>
      <NextLink href="/login">
        <Link color="blackAlpha.900">Already Have An Account !?</Link>
      </NextLink>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(register);
