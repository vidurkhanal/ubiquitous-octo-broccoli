import { NextPage } from "next";
import { Formik, Form } from "formik";
import { InputField } from "../../components/InputField";
import { Box, Button, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import toErrorMap from "../../utils/toErrorMap";
import { useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import NextLink from "next/link";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Head>
        <title>Reset Your Password</title>
      </Head>
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (val, { setErrors }) => {
          if (val.newPassword.length <= 5) {
            setErrors({ newPassword: "Password is way too smaller." });
            return;
          }
          const response = await changePassword({
            newPassword: val.newPassword,
            token,
          });
          if (response.data?.changePassword.error) {
            const errorMap = toErrorMap(response.data?.changePassword.error);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            router.push("/login");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="Password"
              label="Enter Your Password"
              type="password"
              isRequired={true}
            />
            <Box>
              <NextLink href="/forgot-password">
                <Link color="red.700">Resend the email.</Link>
              </NextLink>
              <Box color="red">{tokenError}</Box>
            </Box>
            <Button
              mt="4"
              variant="solid"
              color="orange.700"
              type="submit"
              isLoading={isSubmitting}
            >
              Reset
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
