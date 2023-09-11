import { Formik, Form } from "formik";
import * as Yup from "yup";
import SocialMediaRegistry from "./SocialMediaRegistry";
import { LOGIN_MUTATION } from "@/src/graphQl/queries/LoginSession";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import InputField from "./InputField";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/features/authSlice";

const SignupSchema = Yup.object().shape({
    identifier: Yup.string().required("Este campo es requerido"),
    password: Yup.string().required("Este campo es requerido"),
});

const LoginForm = () => {
    const dispatch = useDispatch();
    const authUser = useSelector((state) => state.auth.user);
    const router = useRouter();
    const [loginMutation, { data: loginData, error: loginError }] =
        useMutation(LOGIN_MUTATION);
    const [loginDetails, setLoginDetails] = useState({
        identifier: "",
        password: "",
    });
    const submitLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await loginMutation({
                variables: {
                    input: loginDetails, // Provide the input object with identifier and password
                },
            });

            if (response.data && response.data.login) {
                // Successful login, handle the response
                const { jwt, user } = response.data.login;
                dispatch(setUser(user));
                localStorage.setItem(
                    "sessionData",
                    JSON.stringify({ user, isAuthenticated: true })
                );
                router.push("/");
            } else {
                console.error("Login failed: Invalid data");
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
        } finally {
            setLoginDetails({
                identifier: "",
                password: "",
            });
        }
    };

    if (loginError) {
        console.error("Apollo Client error during login:", loginError);
    }
    return (
        <div className=" flex h-screen justify-center items-center w-full ">
            <div className="w-[300px]">
                <Formik
                    initialValues={{
                        identifier: "",
                        password: "",
                    }}
                    validationSchema={SignupSchema}
                >
                    {({ errors, touched }) => {
                        return (
                            <Form onSubmit={submitLogin}>
                                <h2
                                    className="text-orange font-semibold flex justify-center
                                 items-center h-[50px] "
                                >
                                    Identifícate
                                </h2>
                                <div>
                                    <InputField
                                        type="text"
                                        id="identifier"
                                        name="identifier"
                                        placeholder="Nombre de usuario"
                                        onChange={(e) =>
                                            setLoginDetails({
                                                ...loginDetails,
                                                identifier: e.target.value,
                                            })
                                        }
                                        error={
                                            errors.identifier &&
                                            touched.identifier
                                        }
                                    />
                                </div>
                                <div>
                                    <InputField
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Contraseña"
                                        onChange={(e) =>
                                            setLoginDetails({
                                                ...loginDetails,
                                                password: e.target.value,
                                            })
                                        }
                                        error={
                                            errors.password && touched.password
                                        }
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-300 text-whitetext-base
                                     rounded-lg py-2 px-5 transition-colors w-full text-[19px]
                                      text-white bg-aquamarine disabled:opacity-50"
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
