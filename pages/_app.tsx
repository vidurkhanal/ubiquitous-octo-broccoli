import "../styles/globals.css";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { createClient, Provider } from "urql";

function MyApp({ Component, pageProps }) {
  const client = createClient({
    url: "http://localhost:8080/graphql",
    fetchOptions: {
      credentials: "include",
    },
  });

  return (
    <Provider value={client}>
      <ChakraProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
