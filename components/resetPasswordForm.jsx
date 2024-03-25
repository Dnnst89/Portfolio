"use client";
/*
  Get reset password code and update the password
*/
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { Toaster, toast } from "react-hot-toast";
import { setUser } from "@/redux/features/authSlice";
import CheckOutHeader from "@/components/CheckoutHeader";
import ErrorForm from "@/components/ErrorForm";
import { UPDATE_PASSWORD } from "@/src/graphQl/queries/updatePassword";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import GET_ERROR_INFO from "@/src/graphQl/queries/getErrorInfo";
const initialValues = {
  password: "",
  confirmPassword: "",
};
// Validation Schema
const validationSchema = Yup.object().shape({
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

const ResetPasswordForm = ({ code, resetForm }) => {
  const { data: errorMessage } = useQuery(GET_ERROR_INFO, {
    variables: { id: 19 },
  });
  const router = useRouter();
  //const dispatch = useDispatch();
  // Call mutation
  const [updatePassword] = useMutation(UPDATE_PASSWORD);
  //pass the input values
  const handleUpdatePassword = async (values) => {
    const { password, confirmPassword } = values;

    try {
      // execute the mutation with the necesary parameters
      const { data } = await updatePassword({
        variables: { password, passwordConfirmation: confirmPassword, code },
      });

      // Handle the response here store the JWT token
      toast.success("Contraseña actualizada correctamente.", {
        duration: 4000,
      });
      setTimeout(() => {
        router.push("login");
      }, 4000);

      // Dispatch user and update shopping session
      // dispatch(setUser(data.resetPassword.user));
    } catch (error) {
      toast.error(errorMessage.errorInformation.data.attributes.error_message, {
        autoClose: 5000,
      });
    } finally {
      resetForm();
    }
  };

  return (
    <div className="h-screen">
      <CheckOutHeader regresar={"/"} />
      <div className="flex justify-center items-center w-full md:max-w-screen-xl m-auto">
        <div className="w-full">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleUpdatePassword}
          >
            {({ errors, touched }) => {
              return (
                <>
                  <Form className="max-w-screen-xl items-center mt-20 grid grid-cols-12 m-auto">
                    <h1 className=" text-3xl flex justify-center items-center mb-10 col-span-12 text-center">
                      Ingresa tu nueva contraseña
                    </h1>

                    <div className="bg-resene pt-10 w-full flex flex-col items-center border-dashed border-2 border-[#787878] drop-shadow-card col-start-2 col-span-10 md:col-start-3 md:col-span-8">
                      <div className="flex grid grid-cols-12 m-auto w-full">
                        <section className="p-3 m-auto col-span-12 grid grid-cols-12 gap-5">
                          <div className="grid col-span-12 md:col-span-6 content-baseline w-full">
                            <label htmlFor="password">
                              Constraseña
                              <span className="text-pink-200">*</span>
                            </label>
                            <Field
                              type="password"
                              id="password"
                              name="password"
                              className="focus:border-blue-500 outline-none md:px-6 py-2 mb-2 rounded-lg border-2 border-grey-200 w-full"
                              autoFocus={true}
                            />
                            {errors.password && touched.password ? (
                              <ErrorForm>{errors.password}</ErrorForm>
                            ) : null}
                          </div>

                          <div className="grid col-span-12 md:col-span-6 content-baseline w-full">
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
                              className="focus:border-blue-500 outline-none md:px-6 py-2 mb-2 rounded-lg border-2 border-grey-200 w-full"
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
                        className="bg-blue-500 hover:bg-blue-300 text-whitetext-base rounded-lg py-2 px-5 transition-colors text-lg text-white bg-pink-200 disabled:opacity-50 flex justify-center mx-auto mt-5 my-4"
                      >
                        Continuar
                      </button>
                    </div>
                  </Form>
                  <Toaster />
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

export default ResetPasswordForm;
