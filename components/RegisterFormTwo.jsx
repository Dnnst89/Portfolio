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
import CheckOutHeader from "./CheckoutHeader";
import { updateShoppingSession } from '@/redux/features/cart-slice';
import CREATE_SHOPPING_SESSION_MUTATION from "@/src/graphQl/queries/createShoppingSession";
import useSession from "@/hooks/useSession";

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
  const [createShoppingSession] = useMutation(CREATE_SHOPPING_SESSION_MUTATION)
  const handleSubmit = async (values) => {
    const dataValues = Object.keys(values).map((el) => {
      return values[el];
    });
    if (dataValues.some((el) => !el)) {
      return;
    }
    const { email, password } = values;

    try {
      const fechaActual = new Date();
      const fechaFormateada = fechaActual.toISOString();
      setLoading(true);
      const { data } = await createUser({
        variables: { username, email, password },
      })
      router.push("/");
      createElement("userData", JSON.stringify(data.register));
      dispatch(setUser(data.register.user));
      const { data: dataSession } = await createShoppingSession({ //query para crear la session al user
        variables: { publishedAt: fechaFormateada, userId: data.register.user.id },
      });
      dispatch(updateShoppingSession(dataSession.createShoppingSession.data)); //ACTUALIZO LA SESSION CON LOS DATOS OBTENIDOS
    } catch (error) {
      toast.error(
        "No se pudo registrar tu cuenta, por favor intentalo más tarde"
      );
    } finally {
      setLoading(false);
    }
  };
  useSession();

  return (
    <div className="h-screen">
      <CheckOutHeader regresar={"/login"} />
      <div className=" flex justify-center items-center w-full mt-20">
        <div className="">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => {
              return (
                <>
                  <Form className=" w-screen flex flex-col items-center mt-20">
                    <h2 className=" text-3xl flex justify-center items-center mb-10">
                      Registrate
                    </h2>

                    <div className="bg-resene p-10 w-6/12 flex flex-col items-center ">
                      <div className="flex w-10/12 space-x-3">
                        <section className=" p-3 w-3/6">
                          <div className="flex flex-col mb-2">
                            <label
                              className="whitespace-nowrap"
                              htmlFor="userName"
                            >
                              Nombre de usuario
                              <span className="text-pink-200">*</span>
                            </label>
                            <Field
                              type="text"
                              id="userName"
                              name="userName"
                              className="focus:border-blue-500 outline-none px-6 py-2 mb-2 rounded-lg border-2 border-grey-200"
                              autoFocus={true}
                            />
                            {errors.email && touched.email ? (
                              <ErrorForm>{errors.email}</ErrorForm>
                            ) : null}
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="password">
                              Constraseña
                              <span className="text-pink-200">*</span>
                            </label>
                            <Field
                              type="password"
                              id="password"
                              name="password"
                              className="focus:border-blue-500 outline-none  px-6 py-2 mb-2 border-2 border-grey-200 rounded-lg "
                              autoFocus={true}
                            />
                            {errors.password && touched.password ? (
                              <ErrorForm>{errors.password}</ErrorForm>
                            ) : null}
                          </div>
                        </section>
                        <section className="p-3 w-3/6">
                          <div className="flex flex-col mb-2">
                            <label
                              className="whitespace-nowrap"
                              htmlFor="email"
                            >
                              Correo electrónico
                              <span className="text-pink-200">*</span>
                            </label>
                            <Field
                              type="email"
                              id="email"
                              name="email"
                              className="focus:border-blue-500 outline-none px-6 py-2 mb-2 rounded-lg border-2 border-grey-200"
                              autoFocus={true}
                            />
                            {errors.email && touched.email ? (
                              <ErrorForm>{errors.email}</ErrorForm>
                            ) : null}
                          </div>
                          <div className="flex flex-col">
                            <label
                              className="whitespace-nowrap w-[100px]"
                              htmlFor="confirmPassword"
                            >
                              Confirmar contraseña
                              <span className="text-pink-200">*</span>
                            </label>
                            <Field
                              type="password"
                              id="confirmPassword"
                              name="confirmPassword"
                              className="focus:border-blue-500 outline-none  px-6 py-2 mb-2 rounded-lg border-2 border-grey-200"
                              autoFocus={true}
                            />
                            {errors.confirmPassword &&
                              touched.confirmPassword ? (
                              <ErrorForm>{errors.confirmPassword}</ErrorForm>
                            ) : null}
                          </div>
                        </section>
                      </div>

                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-300 text-whitetext-base rounded-lg py-2 px-5 transition-colors text-lg text-white bg-pink-200 disabled:opacity-50 flex justify-center mx-auto mt-5"
                        disabled={
                          (Object.keys(errors).length &&
                            Object.keys(touched).length) ||
                          loading
                        }
                      >
                        {loading ? <Spinner /> : "Registrar"}
                      </button>
                    </div>
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
          {/* <SocialMediaRegistry /> */}
        </div>
      </div>
    </div>
  );
};

export default RegisterFormTwo;
