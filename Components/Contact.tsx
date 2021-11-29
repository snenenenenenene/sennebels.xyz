import React from "react";
import toast from "react-hot-toast";
import emailjs from 'emailjs-com'

export default function Contact() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  function handleSubmit(e : any) {
    e.preventDefault();
    const toastId = toast.loading('Sending Message...');
    const templateParams = {
      from_name: email,
      to_name: "sennebels@gmail.com",
      message: message
    };
    emailjs
    .send("service_vb780fd", "template_1f0e3rf", templateParams, "user_iKcb9b4DVPIx7HcQpW8gf")
    .then(() => {
      toast.dismiss(toastId)
      toast.success("Message sent!")
    })
    .catch(error => {
      toast.error("Your message was not able to be sent");
    })
    }

  return (
    <section id="contact" className="relative text-gray-400 bg-grey body-font mt-10">
      <div className="container mx-auto flex sm:flex-nowrap flex-wrap">
        <form
          name="contact"
          onSubmit={handleSubmit}
          className="flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
          <h2 className="text-white sm:text-4xl text-3xl mb-1 font-medium title-font">
            Contact Me
          </h2>
          <p className="leading-relaxed mb-5">
Feel free to contact me by leaving your name, email & message. This does not have to be business related.          </p>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-400">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-grey-light rounded border border-grey focus:border-cyan focus:ring-2 focus:ring-change-light text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-grey-light rounded border border-grey focus:border-cyan focus:ring-2 focus:ring-change-light text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-400">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full bg-grey-light rounded border border-grey focus:border-cyan focus:ring-2 focus:ring-change-light h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="text-black bg-cyan border-0 py-2 px-6 focus:outline-none hover:bg-cyan-dark rounded text-lg">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
