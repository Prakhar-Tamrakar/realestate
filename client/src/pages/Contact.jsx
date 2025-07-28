import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // simulate message send (replace with backend/email logic)
    console.log("Message sent:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    // optionally: setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-slate-800 mb-6 text-center">
        Contact Us
      </h1>
      <p className="text-slate-600 text-center mb-10">
        We'd love to hear from you. Please fill out the form below.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-6"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700">
            Message
          </label>
          <textarea
            id="message"
            rows="5"
            required
            value={formData.message}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <button
          type="submit"
          className="bg-slate-700 text-white px-6 py-3 rounded-md hover:opacity-90 transition"
        >
          Send Message
        </button>

        {submitted && (
          <p className="text-green-600 font-medium pt-4">
            ✅ Your message has been sent!
          </p>
        )}
      </form>
    </div>
  );
};

export default Contact;
