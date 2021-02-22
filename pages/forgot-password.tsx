import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Head from "next/head";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import NextLink from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { GOOGLE_RECAPTCHA_KEY } from "../keys";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface forgotPasswordProps {}

const ForgotPassword: React.FC<forgotPasswordProps> = ({}) => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
  const onSucessfulCaptch = () => {
    setDisableSubmit(false);
  };
  return (
    <Wrapper variant="small">
      <Head>
        <title>Sign In To APP_NAME</title>
      </Head>
      <Formik
        initialValues={{ username: "" }}
        onSubmit={async (val, { setErrors }) => {
          console.log("Submitted!!!");
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
            <Box h="5" />
            <ReCAPTCHA
              sitekey={
                process.env.NODE_ENV !== "production"
                  ? `${GOOGLE_RECAPTCHA_KEY as string}`
                  : `${process.env.GOOGLE_RECAPTCHA_KEY}`
              }
              onChange={onSucessfulCaptch}
            />

            <Button
              mt="4"
              variant="solid"
              color="orange.700"
              type="submit"
              isLoading={isSubmitting}
              disabled={disableSubmit}
            >
              Reset Your Password
            </Button>
          </Form>
        )}
      </Formik>
      <Flex justifyContent="space-between">
        <NextLink href="/login">
          <Link color="red.700">Sign In !!</Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="blackAlpha.900">Create An Account!! </Link>
        </NextLink>
      </Flex>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
