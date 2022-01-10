import React from "react";
import "../styles/globals.css";
import Home from "./index.tsx";
import "tailwindcss/tailwind.css";
import Head from "next/head";

function MyApp({ Component, pageprops }) {
  return (
    <main>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Senne Bels" />
        <meta
          name="twitter:description"
          content="My Personal Portfolio ( and future blog) !"
        />
        <meta
          name="twitter:image"
          content="http://www.sennebels.xyz/preview.png"
        />
        <meta name="twitter:site" content="@snenenenene" />
        <meta name="twitter:creator" content="@snenenenene" />
        <meta property="og:url" content="http://www.sennebels.xyz" />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="My Personal Portfolio ( and future blog) !"
        />
        <meta property="og:description" content="Who Am I?" />
        <meta
          property="og:image"
          content="http://www.sennebels.xyz/preview.png"
        />
        <title>Senne Bels</title>
        <link rel="icon" href="/react.svg" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css"/>
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageprops} />
    </main>
  );
}

export default MyApp;
