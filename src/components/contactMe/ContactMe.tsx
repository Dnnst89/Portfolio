"use client";
import React, { FormEvent, useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactMe = () => {
  const form = useRef<HTMLFormElement>(null);
  console.log(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    if (form.current) {
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
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};
export default ContactMe;
