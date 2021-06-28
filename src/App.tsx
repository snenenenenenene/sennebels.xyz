import React, { useEffect } from "react";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Navbar from "./Components/Navbar";
import Projects from "./Components/Projects";
import Skills from "./Components/Skills";
import Testimonials from "./Components/Testimonials"
import toast, { Toaster } from 'react-hot-toast';

export default function App() {

  useEffect(() => {
    toast.success("Welcome Human!" , {
      icon: '👋',
  iconTheme: {
    primary: '#000',
    secondary: '#fff',
  },
    })
  })
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