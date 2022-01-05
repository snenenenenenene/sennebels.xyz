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
import Music from "../../Components/Music";

const Home = () => {
  return (
    <main>
      <Head>
        <title>Senne Bels - Home</title>
        <link rel="icon" href="/doggy.svg" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css"/>
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* <Script src="js/three.js"></Script> */}
      <Toaster/>
      <Navbar />
      {/* <div className="website-container"> */}
      <About />
      <Skills />
      {/* <Music/> */}
      <Contact />
      {/* </div> */}
      <Footer/>
    </main>
  );
}

export default Home;
