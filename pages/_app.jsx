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
          content="http://www.sennebels.xyz/profilepic.jpeg"
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
          content="http://www.sennebels.xyz/profilepic.jpeg"
        />
      </Head>
      <Component {...pageprops} />
    </main>
  );
}

export default MyApp;
