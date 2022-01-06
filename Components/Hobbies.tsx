import { hobbies } from "../public/Data/Hobbies";
import ReactTooltip from 'react-tooltip';
import Container from "./Container";

export default function Hobbies() {
  return (
    <section id="skills" className="body-font my-20 mx-auto">
      <div className="container mx-auto">
        <Container className="text-center mb-5">
          <h2 className="sm:text-4xl text-3xl font-medium title-font mb-4">
            Hobbies
          </h2>
          <p className="leading-relaxed my-2 font-light">
            These are just a few of the different things that either entertain me or with which I entertain myself in my free time.
          </p>
        </Container>
        <div className="flex flex-wrap justify-center align-middle">
          {hobbies.map((hobby, index) => (
            <div className="p-2 w-20 h-20" key={index}>
              <Container className="hover:bg-gray-100 rounded flex p-2 h-full items-center justify-center">
                <a data-tip={hobby.hobby} className="md:text-5xl text-5xl">{hobby.icon}</a>
                <ReactTooltip place="top" type="dark" effect="solid"/>
              </Container>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
