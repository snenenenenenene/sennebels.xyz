import React from "react";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";
import Container from "./Container";

export const Input = ({ name, onChange }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="leading-7 uppercase text-sm text-gray-400"
      >
        {name}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        className="w-full border-0 border-b-2 border-black outline-none py-2 px-2 leading-8 transition-colors duration-200 ease-in-out"
        onChange={onChange}
      />
    </div>
  );
};

export default function Contact() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
    if (email !== "" && message !== "") {
      const toastId = toast.loading("Sending Message...");
      const templateParams = {
        from_name: email,
        to_name: "sennebels@gmail.com",
        message: message,
      };
      emailjs
        .send(
          "service_vb780fd",
          "template_1f0e3rf",
          templateParams,
          "user_iKcb9b4DVPIx7HcQpW8gf"
        )
        .then(() => {
          toast.dismiss(toastId);
          toast.success("Message sent!");
        })
        .catch((error) => {
          toast.error("Your message was not able to be sent");
        });
    }
    else {
      toast.error("Please enter an email and a message")
    }

  }

  return (
    <div id="contact" className="relative mt-5">
      <div className="flex justify-center">
      <h3 className="text-4xl font-bold">Contact Me</h3>
      </div>
      <div className="container mx-auto flex sm:flex-nowrap flex-wrap">
        <form
          name="contact"
          onSubmit={handleSubmit}
          className="flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0"
        >
          <p className="leading-relaxed text-center mb-5">
            Feel free to contact me by leaving your name, email &amp; message.
            <br />
            This does not have to be business related.{" "}
          </p>
          <div className="mx-auto w-3/4 md:w-2/3">
          <div className="relative mb-4">
            <Input name="name" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="relative mb-4">
            <Input name="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="leading-7 uppercase text-sm text-gray-400"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full resize-none border-0 border-b-2 border-black outline-none py-2 px-2 leading-8 transition-colors duration-200 ease-in-out"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
          <button
            type="submit"
            className="bg-black mt-2 text-white border-0 py-4 px-16 focus:outline-none hover:bg-gray-800 rounded"
          >
            <h2 className="text-2xl font-bold">
            Submit

            </h2>
          </button>
          </div>
          </div>
        </form>
      </div>
      <div className="flex relative mx-auto justify-center">
        <div className="block"></div>
        <Container className="">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d84538.59334235948!2d4.310963388259428!3d51.21307880368991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3f5e038389465%3A0x1125d409660336fc!2sAntwerp%2C%202000%20Antwerp!5e0!3m2!1sen!2sbe!4v1641414457228!5m2!1sen!2sbe" width="600" height="450" className="map" style={{border:0}} allowFullScreen={false} loading="lazy"></iframe>
        </Container>
      </div>
    </div>
  );
}
