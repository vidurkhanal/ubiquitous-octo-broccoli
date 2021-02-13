import { NextPage } from "next";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  return (
    <>
      <b>The Token is {token}</b>
    </>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
