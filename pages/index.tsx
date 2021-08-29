import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div style={{ fontFamily: "monospace" }}>
      <Head>
        <title>&gt;_ volkalhost</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          &gt;
          <span
            style={{
              animation: "blinker 1s linear infinite",
              WebkitAnimation: "blinker 1s linear infinite",
              MozAnimation: "blinker 1s linear infinite",
            }}
          >
            _
          </span>{" "}
          volkalhost
        </h1>
      </main>
    </div>
  );
};

export default Home;
