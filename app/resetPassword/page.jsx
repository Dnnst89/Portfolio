"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "../../src/graphQl/queries/resetPassword";
const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ResetPassword = () => {
  const [resetPassword, { loading, error, data }] = useMutation(RESET_PASSWORD);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Call the RESET_PASSWORD mutation here
      const response = await resetPassword({
        variables: { email: values.email },
      });

      // Check the response and handle it accordingly
      if (response.data && response.data.forgotPassword.ok) {
        // Password reset was successful
        console.log("Password reset successful");
      } else {
        // Password reset failed, handle the error
        console.error("Password reset failed");
      }
    } catch (error) {
      console.error("Error occurred during password reset:", error);
    } finally {
      setSubmitting(false);
    }
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
              disabled={isSubmitting || loading}
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
