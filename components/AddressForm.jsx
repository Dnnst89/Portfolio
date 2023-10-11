"use client";

import * as Yup from "yup";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ErrorForm from "./ErrorForm";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";
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
  const { user } = useStorage();
  const { id } = user || {};
  const [userInformation, setUserInformation] = useState({
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
    userInformation,
  };
  /**
   * Get
   */
  const { data } = useQuery(GET_USER_PAYMENT_INFO, {
    variables: { id: id },
  });

  const cargar = async () => {
    try {
      const { usersPermissionsUser } = data || {};
      const { users_address } = usersPermissionsUser.data.attributes || {};
      setDireccion(users_address.data.id);
      setFirstName(usersPermissionsUser.data.attributes.firstName);
      setLastName(usersPermissionsUser.data.attributes.lastName);
      setPhone(usersPermissionsUser.data.attributes.phoneNumber);
      setEmail(usersPermissionsUser.data.attributes.email);
      setPostCode(users_address.data.attributes.postCode);
      setCountry(users_address.data.attributes.country);
      setAddressLine1(users_address.data.attributes.addressLine1);
      setAddressLine2(users_address.data.attributes.addressLine2);
      setProvince(users_address.data.attributes.province);
      setCanton(users_address.data.attributes.canton);
    } catch (error) {
      console.log("error");
    }
  };
  cargar();
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
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => {
        return (
          <>
            <Form>
              <section className="w-3/4">
                <div className="flex justify-center">
                  <section className="w-1/4 flex flex-col p-2">
                    <InputForm label={"Nombre"} htmlFor={"name"} id={"name"} />
                    <InputForm
                      label={"Correo Electrónico"}
                      htmlFor={"email"}
                      id={"email"}
                    />
                    <InputForm
                      label={"País"}
                      htmlFor={"country"}
                      id={"country"}
                    />
                    <InputForm
                      label={"Cantón"}
                      htmlFor={"canton"}
                      id={"canton"}
                    />
                    <InputForm
                      label={"Código Postal"}
                      htmlFor={"zip"}
                      id={"zip"}
                    />
                    <InputForm
                      label={"Segunda Dirección"}
                      htmlFor={"2"}
                      id={"2"}
                    />
                  </section>
                  <section className="w-1/4 flex flex-col p-2">
                    <InputForm
                      label={"Apellidos"}
                      htmlFor={"lastname"}
                      id={"lastname"}
                    />
                    <InputForm
                      label={"Teléfono"}
                      htmlFor={"phone"}
                      id={"phone"}
                    />
                    <InputForm
                      label={"Provincia"}
                      htmlFor={"provincia"}
                      id={"provincia"}
                    />
                    <InputForm label={"Ciudad"} htmlFor={"city"} id={"city"} />
                    <InputForm
                      label={"Dirección"}
                      htmlFor={"direction"}
                      id={"direction"}
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
                    <InputForm
                      label={"Tipo De Cédula"}
                      htmlFor={"cedula"}
                      id={"cedula"}
                    />
                    <InputForm
                      label={"Nombre Comercial"}
                      htmlFor={"businessname"}
                      id={"businessname"}
                    />
                  </section>
                  <section className="w-1/4 flex flex-col p-2">
                    <InputForm
                      label={"Cédula Comercial"}
                      htmlFor={"businessid"}
                      id={"businessid"}
                    />
                    <InputForm
                      label={"Correo Electrónico"}
                      htmlFor={"email2"}
                      id={"email2"}
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
