"use client";

import * as Yup from "yup";
import Link from "next/link";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ErrorForm from "./ErrorForm";
import useStorage from "@/hooks/useStorage";

import { useLazyQuery, useMutation } from "@apollo/client";
import { UPDATE_USER_INFORMATION } from "@/src/graphQl/queries/updateUserInformation";
import { GET_USER_PAYMENT_INFO } from "@/src/graphQl/queries/getUserPaymentInfo";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Nombre muy corto")
    .max(50, "Nombre muy largo")
    .required("Este campo es requerido"),
  lastName: Yup.string()
    .min(2, "Apellido muy corto")
    .max(50, "Apellido muy largo")
    .required("Este campo es requerido"),
  phone: Yup.number()
    .min(10000000, "Numero de telefono incorrecto")
    .max(99999999, "Numero de telefono incorrecto")
    .required("Este campo es requerido"),
});
const PersonalDataForm = () => {
  const { user } = useStorage(); //me trae el usuario autorizado
  const userId = user?.id;
  const { id } = user || {};
  const authUser = useSelector((state) => state.auth.user);
  const [userInformation, setUserInformation] = useState({ 
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [getUserInfo] = useLazyQuery(GET_USER_PAYMENT_INFO);
  const [updateUserInformation] = useMutation(UPDATE_USER_INFORMATION);
  const [userInfoExist, setUserInfoExist] = useState(); //esta bandera me indica si debo actualizar o crear la informacion para el usuario

  const updatingUserInfo = async (userId, userInformation) => {
    try {
      const { isUserInfoUpdated } = await updateUserInformation({
        variables: {
          firstName: userInformation.firstName,
          lastName: userInformation.lastName,
          phone: parseInt(userInformation.phone),
          id: userId,
        },
      });
    } catch (error) {
      console.error("error updating user information :", error);
    }
  };
  const handleSubmit = async () => {
    updatingUserInfo(userId, userInformation);

  };

  const cargaDatos = async () => {
    const userData = JSON.parse(localStorage.getItem("userData")); //datos de user
    const userDataId = userData.user.id;
    try {
      const { data } = await getUserInfo({
        variables: { id: userDataId },
      });
      // Check if data is available and set userInformation
      if (data && data.usersPermissionsUser) {
        setUserInfoExist(
          !!data?.usersPermissionsUser?.data?.attributes?.users_address?.data
        );

        setUserInformation({
          ...userInformation,
          firstName:
            data?.usersPermissionsUser?.data?.attributes?.firstName || "",
          lastName:
            data?.usersPermissionsUser?.data?.attributes?.lastName || "",
          phone: data?.usersPermissionsUser?.data?.attributes?.phoneNumber || 0,
        });
      }
    } catch (error) {
      console.log("error de cargar : " + error);
    }
  };
  useEffect(() => {
    cargaDatos();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-resene  flex flex-col items-center h-fit col-span-12 mx-3  md:col-span-7">
      <h1 className="m-2">Tus datos</h1>
      <div className="flex justify-center w-11/12">
        <section className="w-full p-5 grid grid-cols-6 gap-3">
          <div className="col-span-6 md:col-span-3 space-y-1">
            <h2 className="font-bold">Nombre de usuario:</h2>
            {authUser && (
              <label className="">{authUser.username}</label>
            )}
          </div>
          <div className="col-span-6 md:col-span-3 space-y-1">
          <h2 className="font-bold">Correo Electrónico:</h2>
            {authUser && (
              <label className="">{authUser.email}</label>
            )}
          </div>

          <Formik
            validationSchema={validationSchema} // Agrega tu esquema de validación
            initialValues={userInformation}
          >
            {({ errors, touched }) => {
              return (
                <>
                  <div className="w-full grid grid-cols-12  col-span-6">
                    <div className="col-span-12">
                      <Form onSubmit={handleSubmit}>
                        <div className="w-full">
                          <main className="flex ">
                            <section className="w-full">
                              <div className="flex justify-center">
                                <section className="w-full grid grid-cols-12 gap-4">
                                  <div className="col-span-12 md:col-span-6 grid content-baseline">
                                    <label htmlFor="name">Nombre</label>
                                    <Field
                                      type="text"
                                      name="firstName"
                                      id="firstName"
                                      className=""
                                      onChange={(e) => {
                                        setUserInformation({
                                          ...userInformation,
                                          firstName: e.target.value,
                                        });
                                      }}
                                      value={userInformation.firstName}
                                    />
                                    {errors.firstName && touched.firstName ? (
                                      <ErrorForm>{errors.firstName}</ErrorForm>
                                    ) : null}
                                  </div>
                                  <div className="col-span-12 md:col-span-6 grid content-baseline">
                                    <label htmlFor="lastName">Apellidos</label>
                                    <Field
                                      type="text"
                                      id="lastName"
                                      name="lastName"
                                      placeholder="Apellidos"
                                      className="form-input"
                                      onChange={(e) => {
                                        setUserInformation({
                                          ...userInformation,
                                          lastName: e.target.value,
                                        });
                                      }}
                                      value={userInformation.lastName}
                                    />
                                    {errors.lastName && touched.lastName ? (
                                      <ErrorForm>{errors.lastName}</ErrorForm>
                                    ) : null}
                                  </div>
                                  <div className="col-span-12 md:col-span-6 grid content-baseline">
                                    <label htmlFor="phone">Teléfono</label>
                                    <Field
                                      type="text"
                                      id="phone"
                                      name="phone"
                                      placeholder="Teléfono"
                                      className="form-input"
                                      onChange={(e) => {
                                        setUserInformation({
                                          ...userInformation,
                                          phone: e.target.value,
                                        });
                                      }}
                                      value={userInformation.phone}
                                    />
                                    {errors.phone && touched.phone ? (
                                      <ErrorForm>{errors.phone}</ErrorForm>
                                    ) : null}
                                  </div>
                                </section>
                              </div>
                            </section>
                          </main>
                          <div className="flex justify-center m-auto mt-8 mb-8 w-3/4 ">
                            <button
                              type="submit"
                              className="bg-pink-200 text-white rounded-sm p-2 w-[150px] whitespace-nowrap"
                            >
                              Guardar
                            </button>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </>
              );
            }}
          </Formik>
          <div className="col-span-6">
            <p className="text-center text-sm hover:underline cursor-pointer text-lightblue mb-3 grid col-span-12 md:col-span-12 w-2/4 m-auto">
              <Link href="/forgotPassword">Cambiar contraseña</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
export default PersonalDataForm;
