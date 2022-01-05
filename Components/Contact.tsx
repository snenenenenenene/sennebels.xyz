import React from "react";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";

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

  return (
    <div id="contact" className="relative my-5">
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
            className="bg-black text-white border-0 py-4 px-16 focus:outline-none hover:bg-gray-800 rounded"
          >
            <h2 className="text-2xl font-bold">
            Submit

            </h2>
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}
