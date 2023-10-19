"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import CheckOutHeader from "@/components/CheckoutHeader";
import { RESET_PASSWORD } from "../../src/graphQl/queries/resetPassword";
import { useRouter } from "next/navigation";
const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("El formato del correo no es el correcto.")
    .required("El correo es requerido."),
});

const ForgotPassword = () => {
  const router = useRouter();
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
        router.push("/login");
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

      <CheckOutHeader regresar={"/personalData"} />
      <div className="flex flex-col items-center max-w-screen-xl m-auto mt-10">

        <div className="bg-resene  p-5 w-2/4 flex flex-col items-center border-dashed border-2 border-[#787878] drop-shadow-card col-start-3 col-span-8 space-y-5">
          <h1>Password Reset</h1>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={ResetPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="space-x-2">
                  <label htmlFor="email">Email:</label>
                  <Field type="email" id="email" name="email" />
                  <ErrorMessage name="email" component="div" />
                </div>
                <button
                  className="bg-aquamarine text-white rounded-sm p-2 flex items-center m-auto mt-5"
                  type="submit"
                  disabled={isSubmitting || loading}
                >
                  Solicitar
                </button>
              </Form>
            )}
          </Formik>
        </div>

      </div>
    </div>

  );
};

export default ForgotPassword;
