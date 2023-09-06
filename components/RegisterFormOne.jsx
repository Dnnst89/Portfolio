"use client";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import ErrorForm from "./ErrorForm";
import SocialMediaRegistry from "./SocialMediaRegistry";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "@/redux/features/registryForm";

const initialValues = {
  username: "",
  firstName: "",
  lastName: "",
};

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Nombre de usuario muy corto")
    .max(50, "Nombre de usuario muy largo")
    .required("Este campo es requerido"),

  firstName: Yup.string()
    .min(2, "Nombre muy corto")
    .max(50, "Nombre muy largo")
    .required("Este campo es requerido"),
  lastName: Yup.string()
    .min(2, "Apellido muy corto")
    .max(50, "Apellido muy largo")
    .required("Este campo es requerido"),
});

const RegisterFormOne = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    // validate if form values is empty
    const dataValues = Object.keys(values).map((el) => {
      return values[el];
    });
    if (dataValues.some((el) => !el)) {
      return;
    }

    dispatch(userData(values));

    // change the route to email form page
    router.push("/register/signemail");
  };

  return (
    <div className=" flex h-screen justify-center items-center w-full ">
      <div className="w-[300px]">
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => {
            return (
              <Form>
                <h2 className="text-orange font-semibold flex justify-center items-center h-[50px] ">
                  Crea tu cuenta
                </h2>
                <div>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Nombre de usuario"
                    className="focus:border-blue-500 outline-none w-full px-6 py-2 mb-2 border  rounded-lg border-none"
                    autoFocus={true}
                  />
                  {errors.username && touched.username ? (
                    <ErrorForm>{errors.username}</ErrorForm>
                  ) : null}
                </div>
                <div>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Nombre"
                    className="focus:border-blue-500 outline-none w-full px-6 py-2 mb-2 border  rounded-lg border-none"
                  />
                  {errors.firstName && touched.firstName ? (
                    <ErrorForm>{errors.firstName}</ErrorForm>
                  ) : null}
                </div>
                <div>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Apellido"
                    className="focus:border-blue-500 outline-none w-full px-6 py-2 mb-2 border  rounded-lg border-none"
                  />
                  {errors.lastName && touched.lastName ? (
                    <ErrorForm>{errors.lastName}</ErrorForm>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-300 text-whitetext-base rounded-lg py-2 px-5 transition-colors w-full text-[19px] text-white bg-aquamarine disabled:opacity-50"
                  disabled={
                    Object.keys(errors).length && Object.keys(touched).length
                  }
                >
                  Continuar
                </button>
              </Form>
            );
          }}
        </Formik>
        <SocialMediaRegistry />
      </div>
    </div>
  );
};

export default RegisterFormOne;
