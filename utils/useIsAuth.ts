import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMyselfQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const router = useRouter();
  const [{ data, fetching }] = useMyselfQuery();
  useEffect(() => {
    if (!fetching && !data?.me) {
      router.push("/login?next=" + router.pathname);
    }
  }, [fetching, data, router]);
};
