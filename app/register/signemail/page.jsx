"use client";
import React, { useState } from "react";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import SocialMediaRegistry from "@/components/SocialMediaRegistry";
// import ErrorForm from "@/components/ErrorForm";
// import { useSelector } from "react-redux";
// import { useMutation } from "@apollo/client";
// import RegisterUser from "@/src/graphQl/queries/registerUser";
// import { createElement } from "@/src/store/store";
// import { useRouter } from "next/navigation";
// import Spinner from "@/components/Spinner";
// import { Toaster, toast } from "react-hot-toast";

// const initialValues = {
//   username: "",
//   firstName: "",
//   lastName: "",
// };

// const SignupSchema = Yup.object().shape({
//   username: Yup.string()
//     .min(2, "Nombre de usuario muy corto")
//     .max(50, "Nombre de usuario muy largo")
//     .required("Este campo es requerido"),

//   firstName: Yup.string()
//     .min(2, "Nombre muy corto")
//     .max(50, "Nombre muy largo")
//     .required("Este campo es requerido"),
//   lastName: Yup.string()
//     .min(2, "Apellido muy corto")
//     .max(50, "Apellido muy largo")
//     .required("Este campo es requerido"),
// });

const SingEmail = () => {
  // const [loading, setLoading] = useState(false);
  // const [createUser] = useMutation(RegisterUser);
  // const { username } = useSelector((x) => x.registryForm);
  // const router = useRouter();
  // const handleSubmit = async (values) => {
  //   const dataValues = Object.keys(values).map((el) => {
  //     return values[el];
  //   });
  //   if (dataValues.some((el) => !el)) {
  //     return;
  //   }
  //   const { email, password } = values;

  //   try {
  //     setLoading(true);
  //     const { data } = await createUser({
  //       variables: { username, email, password },
  //     });
  //     router.push("/");
  //     createElement("userData", JSON.stringify(data.register));
  //   } catch (error) {
  //     toast.error(
  //       "No se pudo registrar tu cuenta, por favor intentalo más tarde"
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <h2>Test registro</h2>
      {/* <div className=" flex h-screen justify-center items-center w-full ">
        <div className="w-[300px]">
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => {
              return (
                <>
                  <Form>
                    <h2 className="text-orange font-semibold flex justify-center items-center h-[50px] ">
                      Verifica tu cuenta
                    </h2>

                    <div>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Correo Electrónico"
                        className="focus:border-blue-500 outline-none w-full px-6 py-2 mb-2 border  rounded-lg border-none"
                        autoFocus={true}
                      />
                      {errors.email && touched.email ? (
                        <ErrorForm>{errors.email}</ErrorForm>
                      ) : null}
                    </div>
                    <div>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Constraseña"
                        className="focus:border-blue-500 outline-none w-full px-6 py-2 mb-2 border  rounded-lg border-none"
                        autoFocus={true}
                      />
                      {errors.password && touched.password ? (
                        <ErrorForm>{errors.password}</ErrorForm>
                      ) : null}
                    </div>
                    <div>
                      <Field
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirmar contraseña"
                        className="focus:border-blue-500 outline-none w-full px-6 py-2 mb-2 border  rounded-lg border-none"
                        autoFocus={true}
                      />
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <ErrorForm>{errors.confirmPassword}</ErrorForm>
                      ) : null}
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-300 text-whitetext-base rounded-lg py-2 px-5 transition-colors w-full text-[19px] text-white bg-aquamarine disabled:opacity-50"
                      disabled={
                        (Object.keys(errors).length &&
                          Object.keys(touched).length) ||
                        loading
                      }
                    >
                      {loading ? <Spinner /> : "Registrame"}
                    </button>
                  </Form>
                  <Toaster
                    toastOptions={{
                      style: {
                        backgroundColor: "#be123d",
                        color: "#FFF",
                        fontSize: "14px",
                      },
                    }}
                  />
                </>
              );
            }}
          </Formik>
          <SocialMediaRegistry />
        </div>
      </div> */}
    </>
  );
};

export default SingEmail;
