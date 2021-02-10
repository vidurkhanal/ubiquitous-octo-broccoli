import Head from "next/head";
import { Navbar } from "../components/Navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";

function Home() {
  const [{ data }] = usePostsQuery();
  return (
    <div>
      <Head>
        <title>Hello World</title>
      </Head>
      <Navbar />
      <ul>
        {data
          ? data.AllPosts.map((post) => <li key={post.id}>{post.title}</li>)
          : null}
      </ul>
    </div>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
