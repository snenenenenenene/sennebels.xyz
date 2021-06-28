import React from "react";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Navbar from "./Components/Navbar";
import Projects from "./Components/Projects";
import Skills from "./Components/Skills";
import Testimonials from "./Components/Testimonials"

export default function App() {
  return (
    <main>
      {/* <Navbar /> */}
      <About />
      <Projects />
      <Skills />
      {/* <Testimonials /> */}
      {/* <Contact /> */}
    </main>
  );
}