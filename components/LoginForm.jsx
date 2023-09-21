import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import SocialMediaRegistry from "./SocialMediaRegistry";
import { LOGIN_MUTATION } from "@/src/graphQl/queries/LoginSession";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/features/authSlice";
import ErrorForm from "./ErrorForm";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GET_SHOPPING_SESSION_BY_USER from "@/src/graphQl/queries/getShoppingSessionByUser";
import { updateShoppingSession } from "@/redux/features/cart-slice";
import client from "../src/graphQl/config"; //se utiliza para poder usar usequery en funciones
import GET_CART_ITEMS_LIST_SHOPPING_SESSION from "@/src/graphQl/queries/getCartItemsByShoppingSession";

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



  const getCartSession = async (userId) => {//me trae la session del usuario
    try {

      const { data } = await client.query({ //llamo la query para traer la shopping session
        query: GET_SHOPPING_SESSION_BY_USER,
        variables: { userId },
      });

      if (data) { // Si existe la sesión
        const shoppingSession = data.shoppingSessions.data[0]; 
        const { data: cartItemsData } = await client.query({ //llamo la query para cartitems de la session
          query: GET_CART_ITEMS_LIST_SHOPPING_SESSION,
          variables: { shoppingSessionId: shoppingSession.id },
        });
        console.log(cartItemsData)
        const cartItems = cartItemsData.cartItems;
        console.log(cartItems)

        // Obtener el objeto cartSession del localStorage (si existe)
        const existingCartSession = localStorage.getItem('cartSession');
        const parsedCartSession = existingCartSession ? JSON.parse(existingCartSession) : {};

        // Agregar tanto shoppingSession como cartItems al objeto cartSession
        parsedCartSession.shoppingSession = shoppingSession;
        parsedCartSession.cartItems = cartItems;

        // Almacenar el objeto cartSession en el localStorage
        localStorage.setItem('cartSession', JSON.stringify(parsedCartSession));
      }
    }
    catch (error) {
      //Manejo de errores
      toast.error(`Ha sucedido un error: `+ error);
    }
  };

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
        await getCartSession(user.id);//obtengo la sesion de compra

        toast.success("Ingreso exitoso!😍");
        router.push("/");
      }
    } catch (error) {
      toast.error(`Credenciales incorrectas, intenta nuevamente.😥`);
    } finally {
      //limpiar formulario
      resetForm();
    }
  };
  return (
    <div className=" flex h-screen justify-center items-center w-full ">
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
      <div className="w-[300px]">
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
              <Form>
                <h2
                  className="text-orange font-semibold flex justify-center
                                 items-center h-[50px] "
                >
                  Identifícate
                </h2>
                <div>
                  <Field
                    type="text"
                    id="identifier"
                    name="identifier"
                    placeholder="Nombre de usuario"
                    className="focus:border-blue-500 outline-none w-full px-6 py-2
                     mb-2 border  rounded-lg border-none"
                  />
                  {errors.identifier && touched.identifier ? (
                    <ErrorForm>{errors.identifier}</ErrorForm>
                  ) : null}
                </div>
                <div className="relative">
                  <Field
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    className="focus:border-blue-500 outline-none
                     w-full px-6 py-2 mb-2 border  rounded-lg border-none"
                  />
                  {values.password.trim() === "" ? (
                    ""
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute right-2 top-1/3 cursor-pointer"
                    >
                      {passwordVisible ? (
                        <FaEye color="#ff7849" />
                      ) : (
                        <FaEyeSlash color="#ff7849" />
                      )}
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-300 text-whitetext-base
                                     rounded-lg py-2 px-5 transition-colors w-full text-[19px]
                                      text-white bg-aquamarine disabled:opacity-50"
                  disabled={
                    Object.keys(errors).length && Object.keys(touched).length
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
