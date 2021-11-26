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
    <section id="contact" className="relative text-gray-400 bg-grey body-font">
      <div className="container px-5 py-10 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="lg:w-2/3 md:w-1/2 bg-grey rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
          <iframe
            width="100%"
            height="100%"
            title="map"
            className="absolute inset-0"
            frameBorder={0}
            marginHeight={0}
            marginWidth={0}
            style={{ filter: "opacity(0.7)" }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d443869.9313036715!2d4.277957622653986!3d51.289148989112036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c409749de45055%3A0xba0ea6d89bcef827!2sPlatanenlaan%2097%2C%202940%20Stabroek!5e0!3m2!1sen!2sbe!4v1624887566823!5m2!1sen!2sbe"
          />
          <div className="bg-grey relative flex flex-wrap py-6 rounded shadow-md">
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                ADDRESS
              </h2>
              <p className="mt-1">
                Platanenlaan 97<br />
                Stabroek, Antwerp 2940
              </p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                EMAIL
              </h2>
              <a className="text-change-light leading-relaxed">
                sennebels@gmail.com
              </a>
              <h2 className="title-font font-semibold text-white tracking-widest text-xs mt-4">
                PHONE
              </h2>
              <p className="leading-relaxed">+32-470-97-67-09</p>
            </div>
          </div>
        </div>
        <form
        //   netlify
          name="contact"
          onSubmit={handleSubmit}
          className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
          <h2 className="text-white sm:text-4xl text-3xl mb-1 font-medium title-font">
            Hire Me
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
