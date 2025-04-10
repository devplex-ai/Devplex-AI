import React from "react";

const ContactForm = () => {
  return (
    <section className="bg-gray-900 text-white px-4 py-12 md:px-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
        <form
          className="space-y-6"
          method="POST"
          action="https://api.web3forms.com/submit"
        >
          <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Full Name
            </label>
            <input
              className="w-full px-4 py-2"
              type="text"
              name="name"
              id="name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full px-4 py-2"
              type="email"
              name="email"
              id="email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="phone">
              Contact Number
            </label>
            <input
              className="w-full px-4 py-2"
              type="tel"
              name="phone"
              id="phone"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="message">
              Message
            </label>
            <textarea
              className="w-full px-4 py-2"
              name="message"
              id="message"
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-purple-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
