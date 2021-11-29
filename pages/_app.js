import React, { useEffect } from "react";
import About from "../Components/About";
import Contact from "../Components/Contact";
import Navbar from "../Components/Navbar";
import Skills from "../Components/Skills";
import Socials from "../Components/Socials";
import toast, { Toaster } from 'react-hot-toast';
import '../styles/globals.css'
import Head from 'next/head'
import Script from 'next/script'
import Home from "./Home.tsx"

function MyApp() {
  return (
    <main>
      <Home/>
    </main>
  );
}

export default MyApp;
