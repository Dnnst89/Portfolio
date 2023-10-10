"use client";

import * as Yup from "yup";
import React, { useLayoutEffect, useState } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import ErrorForm from "./ErrorForm";


//import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import { GetAddress } from "@/src/graphQl/queries/getAddress";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_PENDING_ORDER } from "@/src/graphQl/queries/isOrderPending";
import { GET_ADDRESS } from "@/src/graphQl/queries/getAddress";
import { CREATE_ADDRESS } from "@/src/graphQl/queries/CreateAddress";

import { UPDATE_USER_INFORMATION } from "@/src/graphQl/queries/UpdateUserInformation";
import { UPDATE_ADDRESS } from "@/src/graphQl/queries/UpdateAddress ";
import { UPDATE_ID_CARD } from "@/src/graphQl/queries/updateIdCard";
import FormikField from "./FormikField";
import useStorage from "@/hooks/useStorage";

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
        .max(250, "La información es muy grande por favor utilizar la segunda linea")
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


const AddresForm = () => {
    const { user } = useStorage();
    const { id } = user || {};
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [postCode, setPostCode] = useState();
    const [country, setCountry] = useState();
    const [addressLine1, setAddressLine1] = useState();
    const [addressLine2, setAddressLine2] = useState();
    const [province, setProvince] = useState();
    const [canton, setCanton] = useState();
    const [direccion, setDireccion] = useState();

    const [CreateAddress] = useMutation(CREATE_ADDRESS);
    const [UpdateUserInformation] = useMutation(UPDATE_USER_INFORMATION);
    const [UpdateAddress] = useMutation(UPDATE_ADDRESS);
    const [UpdateIdCard] = useMutation(UPDATE_ID_CARD);

    const initialValues = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        postCode: postCode,
        country: country,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        province: province,
        canton: canton,
        checkbox: false,
        idNumber: 0,
        idType: ""


    }

    //const { users_address } =  || {};
    const router = useRouter();

    const cargar = async () => {
        try {

            const { data } = await useQuery(GET_ADDRESS, {
                variables: { id: id },
            });


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
            console.log(email, country)


        } catch (error) {
            console.log("ssss")
        }


    }
    cargar();








    const handleSubmit = (values) => {
        /*  const dataValues = Object.keys(values).map((el) => {
              return values[el];
          });
          if (dataValues.some((el) => !el)) {
              
              return;
          }*/
        const isoDate = new Date().toISOString();

        //const id = values.user
        const { checkbox, idNumber, idType, firstName, lastName, email, phone, postCode, country, addressLine1, addressLine2, province, canton, user } = values;
        //console.log(id);
        //  console.log(values);
        //console.log(isoDate);


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
                        id: parseInt(id)
                    },
                });
                router.push("/");
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
                        id: parseInt(id)
                    },
                });
                router.push("/");


            }

            if (checkbox == true) {
                UpdateIdCard({
                    variables: {

                        idNumber: parseInt(idNumber),
                        idType: idType,
                        id: parseInt(id)
                    },
                });
            }
            router.push("/");






        } catch (error) {


        } finally {
            router.push("/");
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

                            <section className="w-3/4 flex flex-col p-2 space-y-1">
                                <section className="w-2/4 flex flex-col p-2 space-y-1">

                                    <div>

                                        <FormikField
                                            label={"Nombre"}
                                            htmlFor={"firstName"}
                                            id={"firstName"}
                                        />
                                        {errors?.firstName && touched?.firstName ? (
                                            <ErrorForm>{errors?.firstName}</ErrorForm>
                                        ) : null}
                                    </div>
                                    <div>
                                        <FormikField
                                            label={"Correo Electrónico"}
                                            htmlFor={"email"}
                                            id={"email"}
                                        />
                                        {errors?.email && touched?.email ? (
                                            <ErrorForm>{errors?.email}</ErrorForm>
                                        ) : null
                                        }

                                    </div>

                                    <div>
                                        <FormikField
                                            label={"País"}
                                            htmlFor={"country"}
                                            id={"country"}
                                        />

                                        {errors?.country && touched?.country ? (
                                            <ErrorForm>{errors?.country}</ErrorForm>
                                        ) : null}
                                    </div>
                                    <div>
                                        <FormikField
                                            label={"Cantón"}
                                            htmlFor={"canton"}
                                            id={"canton"}
                                        />
                                        {errors?.canton && touched?.canton ? (
                                            <ErrorForm>{errors?.canton}</ErrorForm>
                                        ) : null}


                                    </div>

                                    <div>
                                        <FormikField
                                            label={"Código Postal"}
                                            htmlFor={"postCode"}
                                            id={"postCode"}
                                        />

                                        {errors?.postCode && touched?.postCode ? (
                                            <ErrorForm>{errors?.postCode}</ErrorForm>
                                        ) : null}

                                    </div>



                                </section>
                                <section className="w-2/4 flex flex-col p-2 space-y-1">

                                    <div>
                                        <FormikField
                                            label={"Apellidos"}
                                            htmlFor={"lastName"}
                                            id={"lastName"}
                                        />

                                        {errors?.lastName && touched?.lastName ? (
                                            <ErrorForm>{errors?.lastName}</ErrorForm>
                                        ) : null}
                                    </div>
                                    <div>

                                        <FormikField
                                            label={"Teléfono"}
                                            htmlFor={"phone"}
                                            id={"phone"}
                                        />

                                        {errors?.phone && touched?.phone ? (
                                            <ErrorForm>{errors?.phone}</ErrorForm>
                                        ) : null}
                                    </div>

                                    <div>

                                        <FormikField
                                            label={"Provincia"}
                                            htmlFor={"province"}
                                            id={"province"}
                                        />

                                        {errors?.province && touched?.province ? (
                                            <ErrorForm>{errors?.province}</ErrorForm>
                                        ) : null}
                                    </div>
                                    <div>
                                        <FormikField
                                            label={"Ciudad"}
                                            htmlFor={"addressLine1"}
                                            id={"addressLine1"}
                                        />

                                        {errors?.addressLine1 && touched?.addressLine1 ? (
                                            <ErrorForm>{errors?.addressLine1}</ErrorForm>
                                        ) : null}

                                    </div>

                                    <div>
                                        <FormikField
                                            label={"Segunda Dirección"}
                                            htmlFor={"addressLine2"}
                                            id={"addressLine2"}
                                        />

                                        {errors?.addressLine2 && touched?.addressLine2 ? (
                                            <ErrorForm>{errors?.addressLine2}</ErrorForm>
                                        ) : null}


                                    </div>


                                </section>
                            </section>

                            <div className="flex justify-center">
                                <div >
                                    <section className="w-1/4 flex p-2">
                                        <p className="mr-4 whitespace-nowrap">Factura Electrónica</p>
                                        <label className="switch">
                                            <Field type="checkbox" name="checkbox" id="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </section>
                                    <section className="w-1/4 flex p-2"></section>
                                </div>
                                <section className="w-1/4 flex p-2"></section>
                                <div className="flex justify-center">
                                    <section className="w-2/4 flex flex-col p-2  ">
                                        <FormikField
                                            label={"Tipo De Cédula"}
                                            htmlFor={"cedula"}
                                            id={"cedula"}
                                        />
                                        <FormikField
                                            label={"Nombre Comercial"}
                                            htmlFor={"businessname"}
                                            id={"businessname"}
                                        />
                                    </section>
                                    <section className="w-2/4 flex flex-col p-2">
                                        <FormikField
                                            label={"Cédula Comercial"}
                                            htmlFor={"businessid"}
                                            id={"businessid"}
                                        />
                                        <FormikField
                                            label={"Correo Electrónico"}
                                            htmlFor={"email2"}
                                            id={"email2"}
                                        />
                                    </section>
                                </div>
                            </div>
                            <section className="w-1/4 flex flex-col p-2 space-y-1">

                            </section>
                            <div className="flex justify-center mt-8 mb-8 w-3/4 ">
                                <button
                                    type="submit"
                                    className="bg-pink-200 text-white rounded-sm p-2 w-[150px] whitespace-nowrap"

                                >
                                    Continuar
                                </button>
                            </div>

                        </Form>
                    </>
                )

            }}

        </Formik>













    );
}


export default AddresForm;
