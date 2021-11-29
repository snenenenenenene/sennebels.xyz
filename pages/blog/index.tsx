import React from "react";
import Navbar from "../../Components/Navbar";
import Head from 'next/head'

function Blog() {

  return (
    <main>
      <Head>
        <title>Senne Bels - Blog</title>
        <link rel="icon" href="/doggy.svg" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css"/>
      </Head>
      <Navbar/>
      <p>SUP DUDE</p>
    </main>
  );
}

export default Blog;
