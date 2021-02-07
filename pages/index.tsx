import Head from "next/head";
import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Hello World</title>
      </Head>
      <Navbar />
      Hello World
    </div>
  );
}
