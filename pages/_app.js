import React, { useEffect } from "react";
import About from "../pages/Components/About";
import Contact from "../pages/Components/Contact";
import Navbar from "../pages/Components/Navbar";
import Projects from "../pages/Components/Projects";
import Skills from "../pages/Components/Skills";
import Testimonials from "../pages/Components/Testimonials"
import toast, { Toaster } from 'react-hot-toast';
import '../styles/globals.css'

function MyApp() {

  // useEffect(() => {
  //   toast.success("Welcome Human!" , {
  //     icon: '👋',
  // iconTheme: {
  //   primary: '#000',
  //   secondary: '#fff',
  // },
  //   })
  // })
  return (
    <main>
      <Toaster/>
      <Navbar />
      <About />
      <Projects />
      <Skills />
      {/* <Testimonials /> */}
      <Contact />
    </main>
  );
}

export default MyApp;
