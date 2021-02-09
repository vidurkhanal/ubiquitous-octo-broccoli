import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { cacheExchange, Cache, QueryInput } from "@urql/exchange-graphcache";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import {
  LoginMutation,
  LogoutMutation,
  MyselfDocument,
  MyselfQuery,
  RegisterMutation,
} from "../generated/graphql";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (e: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

function MyApp({ Component, pageProps }) {
  const client = createClient({
    url: "http://localhost:8080/graphql",
    fetchOptions: {
      credentials: "include",
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            logout: (_result, args, cache, info) => {
              betterUpdateQuery<LogoutMutation, MyselfQuery>(
                cache,
                { query: MyselfDocument },
                _result,
                () => ({ me: null })
              );
            },
            login: (_result, args, cache, info) => {
              betterUpdateQuery<LoginMutation, MyselfQuery>(
                cache,
                { query: MyselfDocument },
                _result,
                (result, query) => {
                  if (result.login.error) {
                    return query;
                  } else {
                    return {
                      me: result.login.user,
                    };
                  }
                }
              );
            },
            register: (_result, args, cache, info) => {
              betterUpdateQuery<RegisterMutation, MyselfQuery>(
                cache,
                { query: MyselfDocument },
                _result,
                (result, query) => {
                  if (result.RegisterUser.error) {
                    return query;
                  } else {
                    return {
                      me: result.RegisterUser.user,
                    };
                  }
                }
              );
            },
          },
        },
      }),
      fetchExchange,
    ],
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
