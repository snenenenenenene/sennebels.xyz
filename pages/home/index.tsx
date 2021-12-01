import React from "react";
import About from "../../Components/About";
import Contact from "../../Components/Contact";
import Navbar from "../../Components/Navbar";
import Skills from "../../Components/Skills";
import Socials from "../../Components/Socials";
import toast, { Toaster } from 'react-hot-toast';
import Head from 'next/head'
import Script from 'next/script'
import Footer from "../../Components/Footer";

const Home = () => {
  return (
    <main>
      <Head>
        <title>Senne Bels - Home</title>
        <link rel="icon" href="/doggy.svg" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css"/>
      </Head>
      <Script src="js/three.js"></Script>
      <Toaster/>
      <Navbar />
      <section className="website-container">
      <About />
      <Skills />
      <Contact />
      <Footer/>
      </section>
    </main>
  );
}

export default Home;
