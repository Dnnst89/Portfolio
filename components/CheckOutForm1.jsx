"use client";

import * as Yup from "yup";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { CREATE_ADDRESS } from "@/src/graphQl/queries/createAddress";
import { UPDATE_ADDRESS } from "@/src/graphQl/queries/updateAddress";
import useStorage from "@/hooks/useStorage";
import { UPDATE_USER_INFORMATION } from "@/src/graphQl/queries/updateUserInformation";
import { GET_USER_PAYMENT_INFO } from "@/src/graphQl/queries/getUserPaymentInfo";
import { UPDATE_ID_CARD } from "@/src/graphQl/queries/updateIdCard";
import CartDetail from "./CartDetail";
import CheckOutForm2 from "./CheckOutForm2";
import ErrorForm from "./ErrorForm";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { data } from "autoprefixer";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Nombre muy corto")
    .max(50, "Nombre muy largo")
    .required("Este campo es requerido"),
  lastName: Yup.string()
    .min(2, "Apellido muy corto")
    .max(50, "Apellido muy largo")
    .required("Este campo es requerido"),
  email: Yup.string()
    .email("Correo inválido")
    .required("Este campo es requerido"),
  postCode: Yup.string()
    .min(5, "Código postal inválido")
    .max(5, "Código postal inválido")
    .required("Este campo es requerido"),
  country: Yup.string()
    .min(2, "Nombre del país muy corto")
    .max(50, "Nombre de país muy largo")
    .required("Este campo es requerido"),
  addressLine1: Yup.string()
    .min(2, "la dirección no tiene la información necesaria")
    .max(
      250,
      "La información es muy grande por favor utilizar la segunda linea"
    )
    .required("Este campo es requerido"),
  addressLine2: Yup.string()
    .min(2, "la dirección no tiene la información necesaria")
    .max(250, "La información es muy grande por favor reducirla"),
  province: Yup.string()
    .min(2, "Nombre de la provincia es muy corto")
    .max(50, "Nombre de la provincia es muy largo")
    .required("Este campo es requerido"),
  canton: Yup.string()
    .min(2, "Nombre del cantón es muy corto")
    .max(50, "Nombre del cantón es muy largo")
    .required("Este campo es requerido"),
  phone: Yup.number()
    .min(10000000, "Numero de telefono incorrecto")
    .max(99999999, "Numero de telefono incorrecto")
    .required("Este campo es requerido"),
});
const CheckOutForm1 = () => {
  const isoDate = new Date().toISOString();
  const { user } = useStorage(); //me trae el usuario autorizado
  const userId = user?.id;
  const { id } = user || {};
  const [checkoutForm1Visible, setCheckoutForm1Visible] = useState(false);
  const [amount, setAmount] = useState({
    total: 0,
    subTotal: 0,
    taxes: 0,
  });

  const [userInformation, setUserInformation] = useState({
    //campos de userAddress
    firstName: "",
    lastName: "",
    email: "",
    phone: 0,
    postCode: "",
    country: "",
    addressLine1: "",
    addressLine2: "",
    province: "",
    canton: "",
    checkbox: false,
    idNumber: 0,
    idType: "",
  });
  const [createAddress] = useMutation(CREATE_ADDRESS);
  const [updateUserInformation] = useMutation(UPDATE_USER_INFORMATION);
  const [updateAddress] = useMutation(UPDATE_ADDRESS);
  const [updateIdCard] = useMutation(UPDATE_ID_CARD);
  const [getUserInfo] = useLazyQuery(GET_USER_PAYMENT_INFO);
  //get the id of the addresses user
  const [addressId, setAddressId] = useState();
  const [userInfoExist, setUserInfoExist] = useState(); //esta bandera me indica si debo actualizar o crear la informacion para el usuario

  const handleChange = (data) => {
    setAmount(data);
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
        setAddressId(
          data?.usersPermissionsUser?.data?.attributes?.users_address?.data?.id
        );
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
          postCode:
            data?.usersPermissionsUser?.data?.attributes?.users_address?.data
              ?.attributes?.postCode || "",
          country:
            data?.usersPermissionsUser?.data?.attributes?.users_address?.data
              ?.attributes?.country || "",
          addressLine1:
            data?.usersPermissionsUser?.data?.attributes?.users_address?.data
              ?.attributes?.addressLine1 || "",
          addressLine2:
            data?.usersPermissionsUser?.data?.attributes?.users_address?.data
              ?.attributes?.addressLine2 || "",
          province:
            data?.usersPermissionsUser?.data?.attributes?.users_address?.data
              ?.attributes?.province || "",
          canton:
            data?.usersPermissionsUser?.data?.attributes?.users_address?.data
              ?.attributes?.canton || "",
          idNumber:
            data?.usersPermissionsUser?.data?.attributes?.idCard?.idNumber || 0,
          idType:
            data?.usersPermissionsUser?.data?.attributes?.idCard?.idType || "",
          checkbox: Boolean(
            data?.usersPermissionsUser?.data?.attributes?.idCard?.checkbox ||
              false
          ),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    cargaDatos();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createNewAddress = async (userId, userInformation) => {
    try {
      const isAddressCreated = await createAddress({
        variables: {
          postCode: userInformation.postCode,
          country: userInformation.country,
          addressLine1: userInformation.addressLine1,
          addressLine2: userInformation.addressLine2,
          province: userInformation.province,
          canton: userInformation.canton,
          publishedAt: isoDate,
          id: userId,
        },
      });
    } catch (error) {
      console.error("error creating address ", error);
    }
  };
  const updatingAddress = async (userInformation) => {
    try {
      const { isAddressUpdated } = await updateAddress({
        variables: {
          country: userInformation.country,
          postCode: userInformation.postCode,
          province: userInformation.province,
          addressLine1: userInformation.addressLine1,
          addressLine2: userInformation.addressLine2,
          canton: userInformation.canton,
          id: addressId,
        },
      });
    } catch (error) {
      console.error("error updating user adress :", error);
    }
  };

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
  const updatingUserCardInfo = async (userId, userInformation) => {
    try {
      const { isIdCardUpdated } = await updateIdCard({
        variables: {
          id: userId,
          idNumber: parseInt(userInformation.idNumber),
          idType: userInformation.idType,
        },
      });
      if (userInformation.checkbox) {
        updatingUserCardInfo(userId, userInformation);
      }
    } catch (error) {
      console.error("error updating card information :", error);
    }
  };

  const handleSubmit = async () => {
    updatingUserInfo(userId, userInformation);

    userInfoExist
      ? updatingAddress(userInformation)
      : createNewAddress(userId, userInformation);
    setCheckoutForm1Visible(true);
  };
  return (
    <Formik
      validationSchema={validationSchema} // Agrega tu esquema de validación
      initialValues={userInformation}
    >
      {({ dirty, isValid, errors, touched }) => {
        return (
          <>
            <div className="w-full max-w-screen-xl m-auto grid grid-cols-12 mt-10">
              <div className="col-span-9 md:pr-2">
                <div className="flex  justify-center items-center bg-resene h-[80px] border-b-2 border-dashed border-grey-200">
                  <div className="bg-lightblue rounded-full p-3 w-[50px] flex justify-center text-white text-xl mr-5">
                    1
                  </div>
                  <h1 className="text-xl">Información de envío</h1>
                  {checkoutForm1Visible ? (
                    <div>
                      <button
                        className="ml-8"
                        onClick={() => setCheckoutForm1Visible(false)}
                      >
                        <FaArrowAltCircleDown
                          style={{
                            color: "orange",
                          }}
                          size={35}
                        />
                      </button>
                    </div>
                  ) : null}
                </div>

                {!checkoutForm1Visible ? (
                  <Form onSubmit={handleSubmit}>
                    <div className="mt-[40px] mx-[30px]">
                      <main className="flex ">
                        <section className="w-full">
                          <div className="flex justify-center">
                            <section className="md:w-4/6 grid grid-cols-12 gap-4">
                              <div className="col-span-6 grid">
                                <label htmlFor="name">Nombre</label>
                                <Field
                                  type="text"
                                  name="firstName"
                                  id="firstName"
                                  className="form-input"
                                  onChange={(e) => {
                                    console.log(e);
                                    console.log(userInformation);
                                    setUserInformation({
                                      ...userInformation,
                                      firstName: e.target.value,
                                    });
                                  }}
                                  value={userInformation.firstName}
                                />
                                {touched.firstName && errors.firstName && (
                                  <div className="error">
                                    {errors.firstName}
                                  </div>
                                )}
                                {/* {errors.firstName && touched.firstName ? (
                                  <ErrorForm>{errors.firstName}</ErrorForm>
                                ) : null} */}
                              </div>
                              <div className="col-span-6 grid">
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
                              <div className="col-span-6 grid">
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
                              <div className="col-span-6 grid">
                                <label htmlFor="postCode">Código Postal</label>
                                <Field
                                  type="text"
                                  id="postCode"
                                  name="postCode"
                                  className="form-input"
                                  onChange={(e) => {
                                    setUserInformation({
                                      ...userInformation,
                                      postCode: e.target.value,
                                    });
                                  }}
                                  value={userInformation.postCode}
                                />
                                {errors.postCode && touched.postCode ? (
                                  <ErrorForm>{errors.postCode}</ErrorForm>
                                ) : null}
                              </div>
                              <div className="col-span-6 grid">
                                <label htmlFor="country">Pais</label>
                                <Field
                                  type="text"
                                  id="country"
                                  name="country"
                                  className="form-input"
                                  onChange={(e) => {
                                    setUserInformation({
                                      ...userInformation,
                                      country: e.target.value,
                                    });
                                  }}
                                  value={userInformation.country}
                                />
                                {errors.country && touched.country ? (
                                  <ErrorForm>{errors.country}</ErrorForm>
                                ) : null}
                              </div>
                              <div className="col-span-6 grid">
                                <label htmlFor="province">Provincia</label>
                                <Field
                                  type="text"
                                  id="province"
                                  name="province"
                                  placeholder="Provincia"
                                  className="form-input"
                                  onChange={(e) => {
                                    setUserInformation({
                                      ...userInformation,
                                      province: e.target.value,
                                    });
                                  }}
                                  value={userInformation.province}
                                />
                                {errors.province && touched.province ? (
                                  <ErrorForm>{errors.province}</ErrorForm>
                                ) : null}
                              </div>
                              <div className="col-span-6 grid">
                                <label htmlFor="canton">Cantón</label>
                                <Field
                                  type="text"
                                  id="canton"
                                  name="canton"
                                  className="form-input"
                                  onChange={(e) => {
                                    setUserInformation({
                                      ...userInformation,
                                      canton: e.target.value,
                                    });
                                  }}
                                  value={userInformation.canton}
                                />
                                {errors.canton && touched.canton ? (
                                  <ErrorForm>{errors.canton}</ErrorForm>
                                ) : null}
                              </div>

                              <div className="col-span-6 grid">
                                <label htmlFor="addressLine1">
                                  Direccion 1
                                </label>
                                <Field
                                  type="text"
                                  id="addressLine1"
                                  name="addressLine1"
                                  placeholder="Direccion 1"
                                  className="form-input"
                                  onChange={(e) => {
                                    setUserInformation({
                                      ...userInformation,
                                      addressLine1: e.target.value,
                                    });
                                  }}
                                  value={userInformation.addressLine1}
                                />
                                {errors.addressLine1 && touched.addressLine1 ? (
                                  <ErrorForm>{errors.addressLine1}</ErrorForm>
                                ) : null}
                              </div>

                              <div className="col-span-6 grid">
                                <label htmlFor="addressLine2">
                                  Direccion 2
                                </label>
                                <Field
                                  type="text"
                                  id="addressLine2"
                                  name="addressLine2"
                                  placeholder="Direccion 2"
                                  className="form-input"
                                  onChange={(e) => {
                                    setUserInformation({
                                      ...userInformation,
                                      addressLine2: e.target.value,
                                    });
                                  }}
                                  value={userInformation.addressLine2}
                                />
                                {errors.addressLine2 && touched.addressLine2 ? (
                                  <ErrorForm>{errors.addressLine2}</ErrorForm>
                                ) : null}
                              </div>
                            </section>
                          </div>
                          <div className="flex justify-center w-full">
                            <section className="w-2/4 m-auto mt-10 mb-5">
                              <label htmlFor="checkbox" className="mr-3">
                                Factura Electrónica
                              </label>
                              <Field
                                type="checkbox"
                                id="checkbox"
                                name="checkbox"
                                checked={userInformation.checkbox}
                                placeholder="Factura Electronica"
                                className="form-input"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setUserInformation({
                                      ...userInformation,
                                      checkbox: true,
                                    });
                                  } else {
                                    setUserInformation({
                                      ...userInformation,
                                      checkbox: false,
                                    });
                                  }
                                }}
                              />
                            </section>
                            <section className="w-2/4 m-auto mt-10 mb-5">
                              <label htmlFor="gift" className="mr-3">
                                Envuelto para regalo
                              </label>
                              <Field
                                type="checkbox"
                                id="gift"
                                name="gift"
                                checked={userInformation.checkbox}
                                placeholder=""
                                className="form-input"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                  } else {
                                  }
                                }}
                              />
                            </section>

                            <section className="w-1/4 flex p-2"></section>
                          </div>
                          {userInformation.checkbox ? (
                            <div className="flex justify-center">
                              <section className="md:w-4/6 grid grid-cols-12 gap-4">
                                <div className="col-span-6 grid">
                                  <label htmlFor="idType">Tipo De Cédula</label>
                                  <Field
                                    type="text"
                                    id="idType"
                                    name="idType"
                                    placeholder="Tipo De Cédula"
                                    className="form-input"
                                    value={userInformation.idType}
                                    onChange={(e) => {
                                      setUserInformation({
                                        ...userInformation,
                                        idType: e.target.value,
                                      });
                                    }}
                                  />
                                </div>
                                <div className="col-span-6 grid">
                                  <label htmlFor="idNumber">Cédula</label>
                                  <Field
                                    type="text"
                                    id="idNumber"
                                    name="idNumber"
                                    placeholder="Tipo De Cédula"
                                    className="form-input"
                                    onChange={(e) => {
                                      setUserInformation({
                                        ...userInformation,
                                        idNumber: e.target.value,
                                      });
                                    }}
                                    value={userInformation.idNumber}
                                  />
                                </div>
                              </section>
                            </div>
                          ) : (
                            ""
                          )}
                        </section>
                      </main>
                      <div className="flex justify-center m-auto mt-8 mb-8 w-3/4 ">
                        <button
                          type="submit"
                          disabled={!dirty || !isValid}
                          className="bg-pink-200 text-white rounded-sm p-2 w-[150px] whitespace-nowrap"
                        >
                          Continuar
                        </button>
                      </div>
                    </div>
                  </Form>
                ) : (
                  <CheckOutForm2 amount={amount} />
                )}
              </div>
              <div className=" bg-resene rounded-sm col-span-3 h-fit  border-l-4 border-lightblue">
                <div className="flex flex-col space-y-3 ">
                  <CartDetail
                    detailTitle={"Detalle del carrito"}
                    isCheckout
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </>
        );
      }}
    </Formik>
  );
};

export default CheckOutForm1;
