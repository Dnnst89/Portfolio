"use client";

import * as Yup from "yup";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ErrorForm from "./ErrorForm";
import { useRouter } from "next/navigation";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_USER_PAYMENT_INFO } from "@/src/graphQl/queries/getUserPaymentInfo";
import { CREATE_ADDRESS } from "@/src/graphQl/queries/createAddress";
import useStorage from "@/hooks/useStorage";
import InputForm from "./InputForm";
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

  // const { user } = useStorage(); //me trae el usuario autorizado
  // const userId = user?.id
  // console.log(userId)
  const [userInformation, setUserInformation] = useState({ //campos de userAddress
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

  const [createAddress] = useMutation(CREATE_ADDRESS);

  // const [UpdateUserInformation] = useMutation(UPDATE_USER_INFORMATION);
  // const [UpdateAddress] = useMutation(UPDATE_ADDRES);
  // const [UpdateIdCard] = useMutation(UPDATE_ID_CARD);



  const initialValues = {
    firstName: userInformation.firstName,
    lastName: userInformation.lastName,
    email: userInformation.email,
    phone: userInformation.phone,
    postCode: userInformation.postCode,
    country: userInformation.country,
    addressLine1: userInformation.addressLine1,
    addressLine2: userInformation.addressLine2,
    province: userInformation.province,
    canton: userInformation.canton,
    checkbox: false,
    idNumber: userInformation.idNumber,
    idType: userInformation.idType,


  };

  /**
   * Get
   */

  const [getUser] = useLazyQuery(GET_USER_PAYMENT_INFO);


  const cargar = async () => { //me carga la informacion del usuario si el ya el la ha ingresado
    try {
      const { user } = JSON.parse(localStorage.getItem("userData"));
      if (user) {
        const { data } = await getUser({
          variables: { id: user.id },
        });
        if (data) {
          console.log(data); // Agregar esto para depurar la respuesta
          const userData = data?.usersPermissionsUser?.data?.attributes;
          const userAddress = data?.usersPermissionsUser?.data?.attributes?.users_address?.data?.attributes;
          setUserInformation(
            prevState => ({
              ...prevState,
              firstName: userData?.firstName,
              lastName: userData?.lastName,
              email: userData?.email,
              phone: userData?.phoneNumber,
              postCode: userAddress?.postCode,
              country: userAddress?.country,
              addressLine1: userAddress?.addressLine1,
              addressLine2: userAddress?.addressLine2,
              province: userAddress?.province,
              canton: userAddress?.canton,
              idNumber: userData?.idCard?.idNumber,
              idType: userData?.idCard?.idType,
            }));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargar();

  }, []);
  console.log(userInformation);
  const handleSubmit = (values) => {
    const isoDate = new Date().toISOString();
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
    try {
      if (direccion != null) {
        UpdateAddress({
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
        UpdateUserInformation({
          variables: {
            firstName: firstName,
            lastName: lastName,
            phone: parseInt(phone),
            email: email,
            id: parseInt(id),
          },
        });
        if (checkbox == true) {
          UpdateIdCard({
            variables: {
              id: parseInt(id),
              idNumber: parseInt(idNumber),
              idType: idType,
            },
          });
        }
      } else {
        CreateAddress({
          variables: {
            postCode: postCode,
            country: country,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            province: province,
            canton: canton,
            publishedAt: isoDate,
            id: parseInt(id),
          },
        });
        UpdateUserInformation({
          variables: {
            firstName: firstName,
            lastName: lastName,
            phone: parseInt(phone),
            email: email,
            id: parseInt(id),
          },
        });
        if (checkbox == true) {
          UpdateIdCard({
            variables: {
              id: parseInt(id),
              idNumber: parseInt(idNumber),
              idType: idType,
            },
          });
        }
      }
    } catch (error) {
    } finally {
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema} // Agrega tu esquema de validación
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => {
        return (
          <>
            <Form>
              <section className="w-3/4">
                <div className="flex justify-center">
                  <section className="w-1/4 flex flex-col p-2">
                    <label htmlFor="name">Nombre</label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Nombre"
                      className="form-input"
                    />
                    <label htmlFor="email">Email</label>
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Nombre"
                      className="form-input"
                    />
                    <label htmlFor="country">Pais</label>
                    <Field
                      type="text"
                      id="country"
                      name="country"
                      placeholder="País"
                      className="form-input"
                    />
                    <label htmlFor="canton">Cantón</label>
                    <Field
                      type="text"
                      id="canton"
                      name="canton"
                      placeholder="Cantón"
                      className="form-input"
                    />
                    <label htmlFor="postCode">Código Postal</label>
                    <Field
                      type="text"
                      id="postCode"
                      name="postCode"
                      placeholder="Código Postal"
                      className="form-input"
                    />
                    <label htmlFor="addressLine2">Direccion 1</label>
                    <Field
                      type="text"
                      id="addressLine2"
                      name="addressLine2"
                      placeholder="Direccion 1"
                      className="form-input"
                    />
                  </section>
                  <section className="w-1/4 flex flex-col p-2">
                    <label htmlFor="lastname">Apellidos</label>
                    <Field
                      type="text"
                      id="lastname"
                      name="lastname"
                      placeholder="Apellidos"
                      className="form-input"
                    />
                    <label htmlFor="phone">Teléfono</label>
                    <Field
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="Teléfono"
                      className="form-input"
                    />
                    <label htmlFor="province">Provincia</label>
                    <Field
                      type="text"
                      id="province"
                      name="province"
                      placeholder="Provincia"
                      className="form-input"
                    />
                    <label htmlFor="province">Ciudad</label>
                    <Field
                      type="text"
                      id="province"
                      name="province"
                      placeholder="Ciudad"
                      className="form-input"
                    />
                    <label htmlFor="canton">canton</label>
                    <Field
                      type="text"
                      id="canton"
                      name="canton"
                      placeholder="canton"
                      className="form-input"
                    />
                    <label htmlFor="addressLine1">Dirección 1</label>
                    <Field
                      type="text"
                      id="addressLine1"
                      name="addressLine1"
                      placeholder="direccion 1"
                      className="form-input"
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
