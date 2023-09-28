import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { LOGIN_MUTATION } from "@/src/graphQl/queries/LoginSession";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/features/authSlice";
import ErrorForm from "./ErrorForm";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CheckOutHeader from "./CheckoutHeader";
import Link from "next/link";

const SignupSchema = Yup.object().shape({
  identifier: Yup.string().required("Este campo es requerido"),
  password: Yup.string().required("Este campo es requerido"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const router = useRouter();
  const [loginMutation, { data: loginData }] = useMutation(LOGIN_MUTATION);
  const [passwordVisible, setPasswordVisible] = useState(false); // State to track password visibility

  // const getCartSession = async (userId) => {//me trae la session del usuario
  //   try {

  //     const { data } = await client.query({ //llamo la query para traer la shopping session
  //       query: GET_SHOPPING_SESSION_BY_USER,
  //       variables: { userId },
  //     });

  //     if (data) { // Si existe la sesión
  //       const shoppingSession = data.shoppingSessions.data[0];
  //       const { data: cartItemsData } = await client.query({ //llamo la query para cartitems de la session
  //         query: GET_CART_ITEMS_LIST_SHOPPING_SESSION,
  //         variables: { shoppingSessionId: shoppingSession.id },
  //       });
  //       const cartItems = cartItemsData.cartItems;
  //       // Obtener el objeto cartSession del localStorage (si existe)
  //       const existingCartSession = localStorage.getItem('cartSession');
  //       const parsedCartSession = existingCartSession ? JSON.parse(existingCartSession) : {};

  //       // Agregar tanto shoppingSession como cartItems al objeto cartSession
  //       parsedCartSession.shoppingSession = shoppingSession;
  //       parsedCartSession.cartItems = cartItems;

  //       // Almacenar el objeto cartSession en el localStorage
  //       localStorage.setItem('cartSession', JSON.stringify(parsedCartSession));
  //     }
  //   }
  //   catch (error) {
  //     //Manejo de errores
  //     toast.error(`Ha sucedido un error: `+ error);
  //   }
  // };

  const submitLogin = async (values, { resetForm }) => {
    // validate if form values is empty
    const dataValues = Object.keys(values).map((el) => {
      return values[el];
    });
    if (dataValues.some((el) => !el)) {
      return;
    }

    try {
      const response = await loginMutation({
        variables: {
          input: values, // Provide the input object with identifier and password
        },
      });

      if (response.data && response.data.login) {
        // Successful login, handle the response
        const { jwt, user } = response.data.login;
        dispatch(setUser(user));
        localStorage.setItem(
          "userData",
          JSON.stringify({ user, isAuthenticated: true })
        );
        document.cookie = `userData=${JSON.stringify({
          user,
          isAuthenticated: true,
        })}`;
        //await getCartSession(user.id);//obtengo la sesion de compra

        toast.success("Ingreso exitoso!😍", {
          duration: 1000,
        });
        router.push("/");
      }
    } catch (error) {
      toast.error(`Credenciales incorrectas, intenta nuevamente.😥`, {
        duration: 1000,
      });
    } finally {
      //limpiar formulario
      resetForm();
    }
  };
  return (
    <div className="h-screen ">
      <CheckOutHeader regresar={"/register/signemail"} />
      <div className=" flex justify-center items-center mt-20">
        <Toaster
          containerStyle={{
            top: 150,
            left: 20,
            bottom: 20,
            right: 20,
          }}
          toastOptions={{
            success: {
              style: {
                background: "#67C3AD",
              },
            },
            error: {
              style: {
                background: "#f87171",
              },
            },
          }}
        />
        <div className="w-full">
          <Formik
            initialValues={{
              identifier: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={submitLogin}
          >
            {({ errors, touched, values }) => {
              return (
                <Form className="flex flex-col items-center">
                  <h2
                    className=" text-3xl flex justify-center
                                 items-center mt-20 mb-10 "
                  >
                    Iniciar sesión
                  </h2>
                  <div className="bg-resene p-10 px-[100px] w-6/12 flex flex-col items-center">
                    <div className="w-3/6">
                      <label
                        className="text-lg whitespace-nowrap"
                        htmlFor="identifier"
                      >
                        Correo Electrónico
                        <span className="text-pink-200 ml-1">*</span>
                      </label>
                      <Field
                        type="text"
                        id="identifier"
                        name="identifier"
                        className="focus:border-blue-500 outline-none w-full px-6 py-2
                     mb-6 rounded-xl border-2 border-grey-200"
                      />
                      {errors.identifier && touched.identifier ? (
                        <ErrorForm>{errors.identifier}</ErrorForm>
                      ) : null}
                    </div>
                    <div className="relative w-3/6">
                      <label className="text-lg" htmlFor="password">
                        Contraseña
                        <span className="text-pink-200 ml-1">*</span>
                      </label>
                      <Field
                        type={passwordVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        className="focus:border-blue-500 outline-none
                     w-full px-6 py-2 mb-2 border-2 border-grey-200 flex rounded-xl "
                      />
                      {values.password.trim() === "" ? (
                        ""
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          className="absolute right-6 top-11 cursor-pointer"
                        >
                          {passwordVisible ? (
                            <FaEye color="#FB82AF" />
                          ) : (
                            <FaEyeSlash color="#FB82AF" />
                          )}
                        </button>
                      )}
                    </div>
                    <p className="text-center mt-3 text-sm hover:underline cursor-pointer text-lightblue mb-3">
                      <Link href="/login">Recuperar contraseña</Link>
                    </p>
                    <button
                      type="submit"
                      className="rounded-lg py-2 px-5 flex justify-center mx-auto transition-colors w-1/3 text-lg text-white bg-pink-200 disabled:opacity-50 whitespace-nowrap"
                      disabled={
                        Object.keys(errors).length &&
                        Object.keys(touched).length
                      }
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
          {/* <SocialMediaRegistry /> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
