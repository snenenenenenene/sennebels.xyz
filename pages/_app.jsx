import React from "react";
import '../styles/globals.css'
import Home from "./index.tsx"
import 'tailwindcss/tailwind.css'
import Head from 'next/head'

function MyApp({Component, pageprops}) {
  return (
    <main>
      <Head>
      <meta name="twitter:card" content="summary_large_image"/>
      </Head>
      <Head>
<meta name="twitter:title" content="Senne Bels"/>
      </Head>
      <Head>
<meta name="twitter:description" content="My Personal Portfolio ( and future blog) !"/>
      </Head>
      <Head>
<meta name="twitter:image" content="http://www.sennebels.xyz/profilepic.jpeg"/>
      </Head>
      <Head>
<meta name="twitter:site" content="@snenenenene"/>
      </Head>
      <Head>
<meta name="twitter:creator" content="@snenenenene"/>
      </Head>
      <Component
      {...pageprops}/>
    </main>
  );
}

export default MyApp;
