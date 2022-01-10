import Container from "./Container";
import Link from "next/link";

const About = () => {
  return (
    <Container className="container mt-16 mx-auto flex flex-col">
      <div className=" flex flex-col w-2/3 mx-auto items-center mb-16 md:mb-0">
        <p className="mb-24 leading-relaxed text-center">
          Everything I have to look at more than once in my life has to be
          somewhat aesthetically pleasing at the minimum. To give an example to
          put it more concretely, when I started discovering there was more to
          the world of Operating Systems than just Windows and MacOS I turned to{" "}
          <b>Linux</b>. My Ubuntu-using newbie self quickly realised that I
          could customise almost every aspect and colour. However, the
          easy-to-use Ubuntu distribution (or distro as some fellow Linux
          maniacs might call it) had some limitations in the form of
          compatibility issues with the kernel and other techy jargons I will
          try not to fatigue you with. Thus, I turned to the more advanced{" "}
          <b>Arch Linux</b> to name just one of many. Instead of a simple GUI I
          now had to set up and initiate a plethora of different components
          which I had previously never even contemplated, let alone researched.
          The act of continuously moving between the different Linux
          distributions like Ubuntu, PopOs, Arch, Manjaro also compelled me to
          learn how to write bash &amp; python scripts in order to counteract
          the debilitating undertaking of having to reinstall my browsers, code
          editors and other favourite programs as well as configuration files.
          To say that my everlasting quest for the idyllic is a driving factor
          behind my ambition would most definitely be an understatement.
          <br />
          <br />
          Nowadays, instead of constantly moving operating systems I find my
          catharsis &amp; pleasure in web development. Outside of working on
          different front- and backends in both commercial and recreational
          settings I like to immerse myself in the wonderful world of{" "}
          <b>Artificial Intelligence</b>, <b>Machine Learning</b> and{" "}
          <b>Data Mining</b>, which is conveniently also the matter I&apos;m
          majoring in at university.
          <br />
          <br />
          <Link href="/pet_prediction">
            <p className="underline hover:text-gray-500 cursor-pointer">
              Check out this pet classification project!
            </p>
          </Link>
          <br />
          <br />
          It&apos;s always been my main ambition &amp; dream to move to{" "}
          <b>Australia</b> or <b>Canada</b>. A work permit or visa sponsorship
          is hence my number one must-have in a job.
        </p>
      </div>
    </Container>
  );
};

export default About;
