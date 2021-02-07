import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { Box, Button } from "@chakra-ui/react";
import { useLoginMutation } from "../generated/graphql";
import toErrorMap from "../utils/toErrorMap";
import { useRouter } from "next/router";
import Head from "next/head";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Head>
        <title>Sign In To APP_NAME</title>
      </Head>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (val, { setErrors }) => {
          const response = await login(val);
          if (response.data?.login.error) {
            setErrors({ ...toErrorMap(response.data.login.error) });
          } else if (response.data?.login.user) {
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
              color="orange.700"
              type="submit"
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
