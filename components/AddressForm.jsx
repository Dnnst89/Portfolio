"use client";

import * as Yup from "yup";
import React, { useLayoutEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ErrorForm from "./ErrorForm";
import { useRouter } from "next/navigation";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { CREATE_ADDRESS } from "@/src/graphQl/queries/createAddress";
import { UPDATE_ADDRESS } from "@/src/graphQl/queries/updateAddress";
import useStorage from "@/hooks/useStorage";
import InputForm from "./InputForm";
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

const AddressForm = () => {
  let userInfoExist = false; //esta bandera me indica si debo actualizar o crear la informacion para el usuario
  const { user } = useStorage(); //me trae el usuario autorizado
  const id = user?.id;
  const [userInformation, setUserInformation] = useState({
    //campos de userAddress
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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

  //const [createAddress] = useMutation(CREATE_ADDRESS);

  // const [UpdateUserInformation] = useMutation(UPDATE_USER_INFORMATION);
  const [updateAddress] = useMutation(UPDATE_ADDRESS);
  // const [UpdateIdCard] = useMutation(UPDATE_ID_CARD);
  const { data } = useQuery(GET_USER_PAYMENT_INFO, {
    variables: { id: id },
  });

  userInfoExist = !!data?.usersPermissionsUser?.data?.attributes?.users_address; // si user_address existe se guarda en true, si no en false
  useEffect(() => {
    // Check if data is available and set userInformation
    if (data && data.usersPermissionsUser) {
      setUserInformation({
        firstName: data?.usersPermissionsUser?.data?.attributes?.firstName,
        lastName: data?.usersPermissionsUser?.data?.attributes?.lastName,
        phone: data?.usersPermissionsUser?.data?.attributes?.phoneNumber,

        postCode: data?.usersPermissionsUser?.data?.attributes?.users_address?.data?.attributes?.postCode,
        country: data?.usersPermissionsUser?.data?.attributes?.users_address?.data?.attributes?.country,
        addressLine1: data?.usersPermissionsUser?.data?.attributes?.users_address?.data?.attributes?.addressLine1,
        addressLine2: data?.usersPermissionsUser?.data?.attributes?.users_address?.data?.attributes?.addressLine2,
        province: data?.usersPermissionsUser?.data?.attributes?.users_address?.data?.attributes?.province,
        canton: data?.usersPermissionsUser?.data?.attributes?.users_address?.data?.attributes?.canton,
        idNumber: data?.usersPermissionsUser?.data?.attributes?.idCard?.idNumber,
        idType: data?.usersPermissionsUser?.data?.attributes?.idCard?.idType,
      });

    }
  }, [data]);

  console.log(userInfoExist)
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postCode: "",
    country: "",
    addressLine1: "",
    addressLine2: "",
    province: "",
    canton: "",
    checkbox: false,
    idNumber: 0,
    idType: "",
  };
  const handleSubmit = async (values) => {
    const {
      checkbox,
      idNumber,
      idType,
      firstName,
      lastName,
      email,
      phone,
      postCode,
      country,
      addressLine1,
      addressLine2,
      province,
      canton,
    } = values;

    console.log("values : ", canton, addressLine1, addressLine2);

    try {
      if (values) {
        const isAddressUpdated = await UpdateAddress({
          variables: {
            country: country,
            postCode: postCode,
            province: province,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            canton: canton,
            id: parseInt(id),
          },
        });
        console.log("Values :", isAddressUpdated);
      }
    } catch (error) {
      console.log("error making the mutation :", error);
    }
  };
  //const isoDate = new Date().toISOString();

  // try {
  //   if (direccion != null) {
  //     UpdateAddress({
  //       variables: {
  //         country: country,
  //         postCode: postCode,
  //         province: province,
  //         addressLine1: addressLine1,
  //         addressLine2: addressLine2,
  //         canton: canton,
  //         id: parseInt(id),
  //       },
  //     });
  //     UpdateUserInformation({
  //       variables: {
  //         firstName: firstName,
  //         lastName: lastName,
  //         phone: parseInt(phone),
  //         email: email,
  //         id: parseInt(id),
  //       },
  //     });
  //     if (checkbox == true) {
  //       UpdateIdCard({
  //         variables: {
  //           id: parseInt(id),
  //           idNumber: parseInt(idNumber),
  //           idType: idType,
  //         },
  //       });
  //     }
  //   } else {
  //     CreateAddress({
  //       variables: {
  //         postCode: postCode,
  //         country: country,
  //         addressLine1: addressLine1,
  //         addressLine2: addressLine2,
  //         province: province,
  //         canton: canton,
  //         publishedAt: isoDate,
  //         id: parseInt(id),
  //       },
  //     });
  //     UpdateUserInformation({
  //       variables: {
  //         firstName: firstName,
  //         lastName: lastName,
  //         phone: parseInt(phone),
  //         email: email,
  //         id: parseInt(id),
  //       },
  //     });
  //     if (checkbox == true) {
  //       UpdateIdCard({
  //         variables: {
  //           id: parseInt(id),
  //           idNumber: parseInt(idNumber),
  //           idType: idType,
  //         },
  //       });
  //     }
  //   }
  // } catch (error) {
  // } finally {
  // }

  return (
    <Formik
      validationSchema={validationSchema} // Agrega tu esquema de validación
      initialValues={initialValues}
    >
      {({ errors, touched }) => {
        return (
          <>
            <Form onSubmit={handleSubmit}>
              <section className="w-3/4">
                <div className="flex justify-center">
                  <section className="w-1/4 flex flex-col p-2">
                    <label htmlFor="name">Nombre</label>
                    <Field
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="form-input"
                      onChange={Formik.handleChange}
                      value={userInformation.firstName}
                    />
                    <label htmlFor="country">Pais</label>
                    <Field
                      type="text"
                      id="country"
                      name="country"
                      className="form-input"
                      onChange={Formik.handleChange}
                      value={userInformation.country}
                    />
                    <label htmlFor="canton">Cantón</label>
                    <Field
                      type="text"
                      id="canton"
                      name="canton"
                      className="form-input"
                      onChange={Formik.handleChange}
                      value={userInformation.canton}
                    />
                    <label htmlFor="postCode">Código Postal</label>
                    <Field
                      type="text"
                      id="postCode"
                      name="postCode"
                      className="form-input"
                      onChange={Formik.handleChange}
                      value={userInformation.postCode}
                    />
                    <label htmlFor="addressLine2">Direccion 1</label>
                    <Field
                      type="text"
                      id="addressLine1"
                      name="addressLine1"
                      placeholder="Direccion 1"
                      className="form-input"
                      onChange={Formik.handleChange}
                      value={userInformation.addressLine2}
                    />
                  </section>
                  <section className="w-1/4 flex flex-col p-2">
                    <label htmlFor="lastName">Apellidos</label>
                    <Field
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Apellidos"
                      className="form-input"
                      onChange={Formik.handleChange}
                      value={userInformation.lastName}
                    />
                    <label htmlFor="phone">Teléfono</label>
                    <Field
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="Teléfono"
                      className="form-input"
                      onChange={Formik.handleChange}
                      value={userInformation.phone}
                    />
                    <label htmlFor="province">Provincia</label>
                    <Field
                      type="text"
                      id="province"
                      name="province"
                      placeholder="Provincia"
                      className="form-input"
                      onChange={Formik.handleChange}
                      value={userInformation.province}
                    />
                  </section>
                </div>
                <div className="flex justify-center">
                  <section className="w-1/4 flex p-2">
                    <p className="mr-4 whitespace-nowrap">
                      Factura Electrónica
                    </p>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </section>
                  <section className="w-1/4 flex p-2"></section>
                </div>
                <div className="flex justify-center">
                  <section className="w-1/4 flex flex-col p-2  ">
                    <label htmlFor="idNumber">Cédula</label>
                    <Field
                      type="text"
                      id="idNumber"
                      name="idNumber"
                      placeholder="Tipo De Cédula"
                      className="form-input"
                    />
                    <label htmlFor="idType">Tipo De Cédula</label>
                    <Field
                      type="text"
                      id="idType"
                      name="idType"
                      placeholder="Tipo De Cédula"
                      className="form-input"
                    />
                  </section>
                  <section className="w-1/4 flex flex-col p-2">
                    <InputForm
                      label={"Cédula Comercial"}
                      htmlFor={"businessid"}
                      id={"businessid"}
                    />
                  </section>
                  <button
                    type="submit"
                    className="bg-pink-200 text-white rounded-sm p-2 w-[150px] whitespace-nowrap"
                  >
                    Continuar
                  </button>
                </div>
              </section>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};
export default AddressForm;
