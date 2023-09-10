"use client";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import ErrorForm from "./ErrorForm";
import SocialMediaRegistry from "./SocialMediaRegistry";

import { userData } from "@/redux/features/registryForm";
import { useEffect } from "react";

const initialValues = {
    username: "",
    email: "",
};

const SignupSchema = Yup.object().shape({
    username: Yup.string().required("Este campo es requerido"),

    emal: Yup.string()
        .email("Correo inválido")
        .required("Este campo es requerido"),
});

const LoginForm = ({ loading, error, data }) => {
    useEffect(() => {
        console.log(loading, error, data);
    }, [loading, error, data]);
    /* Notas: necesito enviar el estado del usuario al componente TrackUserState
  y asi mostrar el nombre del usuario y si la sesion esta activa o no
*/
    return (
        <div className=" flex h-screen justify-center items-center w-full ">
            <div className="w-[300px]">
                <Formik
                    initialValues={initialValues}
                    validationSchema={SignupSchema}
                >
                    {({ errors, touched }) => {
                        return (
                            <Form>
                                <h2
                                    className="text-orange font-semibold flex justify-center
                                 items-center h-[50px] "
                                >
                                    {JSON.stringify(data)}

                                    {/* 
                                    {"__typename":"UsersPermissionsUserEntity","id":"3",
                                    "attributes":{"__typename":"UsersPermissionsUser","username":"asd",
                                    "email":"john@doe.asd","updatedAt":"2023-09-06T21:44:47.178Z"}}, */}
                                </h2>
                                <div>
                                    <Field
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Nombre de usuario"
                                        className="focus:border-blue-500 outline-none w-full
                                         px-6 py-2 mb-2 border  rounded-lg border-none"
                                        autoFocus={true}
                                    />
                                    {errors.username && touched.username ? (
                                        <ErrorForm>{errors.username}</ErrorForm>
                                    ) : null}
                                </div>
                                <div>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Correo electrónico"
                                        className="focus:border-blue-500 outline-none w-full
                                         px-6 py-2 mb-2 border  rounded-lg border-none"
                                    />
                                    {errors.firstName && touched.firstName ? (
                                        <ErrorForm>
                                            {errors.firstName}
                                        </ErrorForm>
                                    ) : null}
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-300 text-whitetext-base
                                     rounded-lg py-2 px-5 transition-colors w-full text-[19px]
                                      text-white bg-aquamarine disabled:opacity-50"
                                    disabled={
                                        Object.keys(errors).length &&
                                        Object.keys(touched).length
                                    }
                                >
                                    Ingresar
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

export default LoginForm;
