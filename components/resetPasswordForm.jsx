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
  const dispatch = useDispatch();
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

      // Dispatch user and update shopping session
      dispatch(setUser(data.resetPassword.user));
    } catch (error) {
      toast.error("No fue posible actualizar tu contraseña", {
        duration: 4000,
      });
    } finally {
      resetForm();
    }
  };

  return (
    <div className="h-screen">
      <CheckOutHeader regresar={"/"} />
      <div className=" flex justify-center items-center w-full">
        <div className="">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleUpdatePassword}
          >
            {({ errors, touched }) => {
              return (
                <>
                  <Form className=" w-screen flex flex-col items-center mt-20">
                    <h2 className=" text-3xl flex justify-center items-center mb-10">
                      Ingresa tu nueva contraseña
                    </h2>

                    <div className="bg-resene p-10 w-6/12 flex flex-col items-center ">
                      <div className="flex w-10/12 space-x-3">
                        <section className=" p-3 w-3/6">
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
                        className="bg-blue-500 hover:bg-blue-300 text-whitetext-base rounded-lg py-2 px-5 transition-colors text-lg
                         text-white bg-pink-200 disabled:opacity-50 flex justify-center mx-auto mt-5"
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
