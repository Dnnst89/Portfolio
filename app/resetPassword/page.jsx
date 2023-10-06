// pages/reset-password.js
"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ResetPassword = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    // Implement your password reset logic here.
    console.log("Form values:", values);
    setSubmitting(false);
  };

  return (
    <div>
      <h1>Password Reset</h1>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={ResetPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <button
              className="bg-orange text-white rounded-sm"
              type="submit"
              disabled={isSubmitting}
            >
              Reset Password
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
