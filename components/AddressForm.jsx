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
//import { CreateAddress } from "@/src/graphQl/queries/CreateAddress";
//import { UpdateUserAddress } from "@/src/graphQl/queries/updateUserAddress";

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
    const sessionData = useStorage();
    const router = useRouter();
    //const [CreateAddress1] = useMutation(CreateAddress);
    //const [UpdateAddress1] = useMutation(UpdateUserAddress);
    console.log("ssss");
    /*
        
        const { loading, error, address } = useQuery(getAddress, {
            variables: { id },
        });*/
    console.log(sessionData);
    const initialValues = {
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
        user: "",

    };

    const handleSubmit = (values) => {
        /*  const dataValues = Object.keys(values).map((el) => {
              return values[el];
          });
          if (dataValues.some((el) => !el)) {
              
              return;
          }*/

        const id = values.user
        const { postCode, country, addressLine1, addressLine2, province, canton, user } = values;


        try {


            console.log(values)

            /* CreateAddress1({
                 variables: { postCode, country, addressLine1, addressLine2, province, canton, user },
             });
 
             router.push("/");
 */
        } catch (error) {
            console.log(error)
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


                            <section className="w-2/4 flex flex-col p-2 space-y-1">
                                <Field
                                    type="hidden"
                                    id="id"
                                    name="id"
                                    value={sessionData}
                                />
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

                            <section className="w-2/4 flex flex-col p-2 space-y-1">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-300 text-whitetext-base rounded-lg py-2 px-5 transition-colors w-full text-[19px] text-white bg-aquamarine disabled:opacity-50"

                                >
                                    Continuar
                                </button>
                            </section>

                        </Form>
                    </>
                )

            }}

        </Formik>













    );
}


export default AddresForm;
