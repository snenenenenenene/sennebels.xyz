import About from "../Components/About";
import Contact from "../Components/Contact";
import Navbar from "../Components/Navbar";
import Socials from "../Components/Socials";
import Skills from "../Components/Skills";
import toast, { Toaster } from 'react-hot-toast';
import Head from 'next/head'
import Footer from "../Components/Footer";
import Music from "../Components/Music";
import Introduction from "../Components/Introduction";
import Hobbies from "../Components/Hobbies";

const Home = () => {
  return (
    <main>
      <Head>
        <title>Senne Bels - Home</title>
        <link rel="icon" href="/react.svg" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css"/>
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Toaster/>
      <Navbar />
      <Introduction />
      <Socials/>
      <About/>
      <Skills />
      <Hobbies/>
      {/* <Music/> */}
      <Contact />
      <Footer/>
    </main>
  );
}

export default Home;
