"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import SocialMediaRegistry from "./SocialMediaRegistry";
import ErrorForm from "./ErrorForm";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import RegisterUser from "@/src/graphQl/queries/registerUser";
import { createElement } from "@/src/store/store";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import { Toaster, toast } from "react-hot-toast";
import { setUser } from "@/redux/features/authSlice";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo inválido")
    .required("Este campo es requerido"),
  password: Yup.string()
    .required("Este campo es requerido")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(20, "La contraseña no debe superar los 20 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "La contraseña debe contener al menos 1 letra mayúscula, 1 letra minúscula y 1 número"
    ),
  confirmPassword: Yup.string()
    .required("Este campo es requerido")
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden"),
});

const RegisterFormTwo = () => {
  const [loading, setLoading] = useState(false);
  const { username } = useSelector((x) => x.registryForm);
  const router = useRouter();
  const dispatch = useDispatch();
  const [createUser] = useMutation(RegisterUser);
  const handleSubmit = async (values) => {
    const dataValues = Object.keys(values).map((el) => {
      return values[el];
    });
    if (dataValues.some((el) => !el)) {
      return;
    }
    const { email, password } = values;

    try {
      setLoading(true);
      const { data } = await createUser({
        variables: { username, email, password },
      });
      router.push("/");
      createElement("userData", JSON.stringify(data.register));
      dispatch(setUser(data.register.user));
    } catch (error) {
      toast.error(
        "No se pudo registrar tu cuenta, por favor intentalo más tarde"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex h-screen justify-center items-center w-full ">
      <div className="w-[300px]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
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
    </div>
  );
};

export default RegisterFormTwo;
