import { NextPage } from "next";
import { Formik, Form } from "formik";
import { InputField } from "../../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import toErrorMap from "../../utils/toErrorMap";
import { useState } from "react";

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
          const response = await changePassword({
            newPassword: val.newPassword,
            token,
          });
          if (response.data?.changePassword.error) {
            const errorMap = toErrorMap(response.data?.changePassword.error);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
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
            <Box color="red">{tokenError}</Box>
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

export default ChangePassword;
