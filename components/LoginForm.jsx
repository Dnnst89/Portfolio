import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import InputField from "./InputField";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/features/authSlice";
import Swal from "sweetalert2";

import { LOGIN_MUTATION, USER_EXIST } from "@/src/graphQl/queries/LoginSession";
import SocialMediaRegistry from "./SocialMediaRegistry";

const SignupSchema = Yup.object().shape({
    identifier: Yup.string().required("Este campo es requerido"),
    password: Yup.string().required("Este campo es requerido"),
});
const LoginForm = () => {
    const dispatch = useDispatch();
    const [loginDetails, setLoginDetails] = useState({
        identifier: "",
        password: "",
    });
    const { data: userExistData } = useQuery(USER_EXIST);
    const [loginMutation] = useMutation(LOGIN_MUTATION);

    const handleLoginSuccess = (jwt, user) => {
        dispatch(setUser(user));
        localStorage.setItem(
            "sessionData",
            JSON.stringify({ user, isAuthenticated: true })
        );
    };

    const userExists = userExistData?.usersPermissionsUsers?.data.some(
        (user) => user.attributes.username === loginDetails.identifier
    );

    const submitLogin = async (e) => {
        e.preventDefault();

        try {
            if (!userExists) {
                Swal.fire({
                    icon: "info",
                    title: "Lo sentimos...",
                    text: `No hemos encontrado un usuario con ese nombre o la contraseña ingresada es incorrecta. Por favor, verifica tus credenciales e intenta nuevamente.!`,
                    footer: "<div >😥</div>",
                    confirmButtonColor: "#67C3AD",
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Excelente...",
                    text: `Te has registrado exitosamente.!`,
                    footer: "<div >😍</div>",
                    confirmButtonColor: "#67C3AD",
                });
            }

            const response = await loginMutation({
                variables: {
                    input: loginDetails,
                },
            });

            if (response.data && response.data.login) {
                const { jwt, user } = response.data.login;
                handleLoginSuccess(jwt, user);
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Lo sentimos...",
                    text: `No hemos encontrado un usuario con ese nombre o la contraseña ingresada es incorrecta. Por favor, verifica tus credenciales e intenta nuevamente.!`,
                    footer: "<div >😥</div>",
                    confirmButtonColor: "#67C3AD",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "info",
                title: "Lo sentimos...",
                text: `No hemos encontrado un usuario con ese nombre o la contraseña ingresada es incorrecta. Por favor, verifica tus credenciales e intenta nuevamente.!`,
                footer: "<div >😥</div>",
                confirmButtonColor: "#67C3AD",
            });
        } finally {
            // Clear loginDetails after submission
            setLoginDetails({
                identifier: "",
                password: "",
            });
        }
    };

    return (
        <div className="flex h-screen justify-center items-center w-full">
            <div className="w-[300px]">
                <Formik
                    initialValues={loginDetails}
                    validationSchema={SignupSchema}
                    onSubmit={submitLogin}
                >
                    <Form>
                        <h2 className="text-orange font-semibold flex justify-center items-center h-[50px]">
                            Identifícate
                        </h2>
                        <div>
                            <InputField
                                type="text"
                                id="identifier"
                                name="identifier"
                                placeholder="Nombre de usuario"
                            />
                            <ErrorMessage
                                name="identifier"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div>
                            <InputField
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Contraseña"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-300 text-whitetext-base rounded-lg py-2 px-5 transition-colors w-full text-[19px] text-white bg-aquamarine disabled:opacity-50"
                        >
                            Ingresar
                        </button>
                    </Form>
                </Formik>
                <SocialMediaRegistry />
            </div>
        </div>
    );
};

export default LoginForm;
