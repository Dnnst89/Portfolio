'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

const initialValues = {
    userName: '',
    firstName: '',
    lastName: '',
};

const SignupSchema = Yup.object().shape({
    userName: Yup.string()
        .min(2, 'Nombre de usuario muy corto!')
        .max(50, 'Nombre de usuario muy largo!')
        .required('El campo es requerido!'),
    firstName: Yup.string()
        .min(2, 'Nombre muy corto!')
        .max(50, 'Nombre muy largo!')
        .required('El campo es requerido!'),
    lastName: Yup.string()
        .min(2, 'Apellido muy corto!')
        .max(50, 'Apellido muy largo!')
        .required('El campo es requerido!'),
});

const RegisterFormOne = () => {
    return (
        <div className=" flex h-screen justify-center items-center w-full ">
            <div className="w-[300px]">
                <Formik
                    initialValues={initialValues}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <h2 className="text-orange font-semibold flex justify-center items-center h-[50px] ">
                                Verifica tu cuenta
                            </h2>
                            <div>
                                <Field
                                    type="text"
                                    id="userName"
                                    name="userName"
                                    placeholder="Nombre de usuario"
                                    className="focus:border-blue-500 outline-none w-full px-6 py-2 mb-2 border  rounded-lg border-none"
                                />
                                {errors.userName && touched.userName ? (
                                    <div className="text-[#dc2626] text-[10px] pl-3 mb-5">
                                        {errors.userName}
                                    </div>
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
                                {errors.lastName && touched.lastName ? (
                                    <div className="text-[#dc2626] text-[10px] pl-3 mb-5">
                                        {errors.lastName}
                                    </div>
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
                                    <div className="text-[#dc2626] text-[10px] pl-3 mb-5">
                                        {errors.lastName}
                                    </div>
                                ) : null}
                            </div>
                            <Link href="/register/signemail">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-300 text-whitetext-base rounded-lg py-2 px-5 transition-colors w-full text-[19px] text-white bg-aquamarine"
                                >
                                    Continuar
                                </button>
                            </Link>

                            <div className="grid grid-cols-1  mt-5">
                                <div className=" flex justify-center content-center">
                                    <button className=" border border-gray-200 rounded-[50%] p-2 m-1 hover:bg-blue-100">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 48 48"
                                            width="30px"
                                            height="30px"
                                        >
                                            <path
                                                fill="#FFC107"
                                                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                            />
                                            <path
                                                fill="#FF3D00"
                                                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                            />
                                            <path
                                                fill="#4CAF50"
                                                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                            />
                                            <path
                                                fill="#1976D2"
                                                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                            />
                                        </svg>
                                    </button>
                                    <button className="border border-gray-200 hover:bg-blue-100 rounded-[50%] p-2 m-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 48 48"
                                            width="30px"
                                            height="30px"
                                        >
                                            <path
                                                fill="#3F51B5"
                                                d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                                            />
                                            <path
                                                fill="#FFF"
                                                d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className=" grid grid-cols-1 justify-center content-center">
                                    <p className="text-center mt-3 text-[14px]">
                                        Ya tienes una cuenta?
                                        <span className="hover:underline   cursor-pointer text-orange">
                                            {' '}
                                            <Link href="/login">
                                                Iniciar sesión
                                            </Link>
                                        </span>
                                    </p>
                                    <p className="text-center mt-3 text-[14px] hover:underline cursor-pointer">
                                        <Link href="/login">
                                            Olvidaste la contraseña?
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default RegisterFormOne;
