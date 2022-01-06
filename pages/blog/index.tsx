import React from "react";
import Navbar from "../../Components/Navbar";
import Head from 'next/head'
import Link from 'next/link'
import Container from "../../Components/Container";

const Blog = () => {

  return (
    <main>
      <Head>
        <title>Senne Bels - Blog</title>
        <link rel="icon" href="/doggy.svg" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css"/>
      </Head>
      <Navbar/>

     <Container className="">

      <div className="flex flex-col h-96 justify-center align-middle">
      <h2 className="m-auto text-3xl font-bold">This is yet to be implemented</h2>
      <Link href="/">
      <button
            className="bg-black mt-2 text-white border-0 mx-auto w-96 py-4 px-16 focus:outline-none hover:bg-gray-800 rounded"
            >
            <h2 className="text-2xl font-bold">
            Go Back
            </h2>
          </button>
            </Link>
      </div>
              </Container>

    </main>
  );
}

export default Blog;
