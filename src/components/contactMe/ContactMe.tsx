import React, { FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactMe = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.user_name.trim()) {
      newErrors.user_name = "Name is required";
    }
    if (!formData.user_email.trim()) {
      newErrors.user_email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.user_email)) {
      newErrors.user_email = "Email is invalid";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm() && form.current) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ""
        )
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
    }
  };
  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-[#0891b2]">
        Contact Us
      </h2>
      <div className="mb-4">
        <label
          htmlFor="user_name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Name
        </label>
        <input
          type="text"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.user_name ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring focus:border-[#0891b2]`}
        />
        {errors.user_name && (
          <span className="text-red-500 text-sm">{errors.user_name}</span>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="user_email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          name="user_email"
          value={formData.user_email}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.user_email ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring focus:border-[#0891b2]`}
        />
        {errors.user_email && (
          <span className="text-red-500 text-sm">{errors.user_email}</span>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="message"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.message ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring focus:border-[#0891b2]`}
          rows={5}
        ></textarea>
        {errors.message && (
          <span className="text-red-500 text-sm">{errors.message}</span>
        )}
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#0891b2] text-white font-bold rounded-full shadow hover:bg-[#06b6d4] focus:outline-none"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactMe;
