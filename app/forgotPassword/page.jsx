"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import CheckOutHeader from "@/components/CheckoutHeader";
import { RESET_PASSWORD } from "../../src/graphQl/queries/resetPassword";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("El formato del correo no es el correcto.")
    .required("El correo es requerido."),
});

const ForgotPassword = () => {

  const router = useRouter();
  const [resetPassword, { loading, error, data }] = useMutation(RESET_PASSWORD);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Call the RESET_PASSWORD mutation here
      const response = await resetPassword({
        variables: { email: values.email },
      });

      // Check the response and handle it accordingly
      if (response.data && response.data.forgotPassword.ok) {
        // Password reset was successful
        toast.success(
          "Se ha generado un correo para la recuperación de tu contraseña.",
          {
            duration: 4000,
          }
        );
        setTimeout(() => {
          router.push("/");
        }, 4000);
      } else {
        // Password reset failed, handle the error
        toast.error("No fue posible reestablecer tu contraseña", {
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Error occurred during password reset:", error);
    } finally {
      resetForm();
      setSubmitting(false);
    }
  };

  return (
    <div className="h-screen">
      <Toaster />
      <CheckOutHeader regresar={"/personalData"} />
      <div className="flex justify-center items-center w-full md:max-w-screen-xl m-auto">
        <div className="w-full">

          <Formik
            initialValues={{ email: "" }}
            validationSchema={ResetPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="max-w-screen-xl items-center mt-20 grid grid-cols-12 m-auto">
                <h1 className="text-3xl flex justify-center items-center mb-10 col-span-12 text-center">
                  Cambiar contraseña
                </h1>

                <div className="bg-resene  w-full flex flex-col items-center border-dashed border-2 border-[#787878] drop-shadow-card col-start-2 col-span-10 md:col-start-3 md:col-span-8 py-10">
                  <div className="flex grid grid-cols-12 m-auto w-full">
                    <section className="p-3 m-auto col-span-12 grid grid-cols-12 gap-5">
                      <div className="grid col-span-12 md:col-span-12 content-baseline w-full">
                        <label htmlFor="email">Email:</label>
                        <Field type="email" id="email" name="email" />
                        <ErrorMessage
                          className="text-[#ef4444] text-sm"
                          name="email"
                          component="div"
                        />
                      </div>
                      <div className="grid col-span-12 md:col-span-12 items-center content-baseline m-auto w-full">
                        <button
                          className="bg-aquamarine text-white rounded-sm p-2 flex items-center m-auto mt-5"
                          type="submit"
                          disabled={isSubmitting || loading}
                        >
                          Solicitar
                        </button>
                      </div>
                    </section>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div >
  );
};

export default ForgotPassword;
