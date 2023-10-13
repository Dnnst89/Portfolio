import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, "Nombre muy corto")
        .max(50, "Nombre muy largo")
        .required("Este campo es requerido"),
    lastName: Yup.string()
        .min(2, "Apellido muy corto")
        .max(50, "Apellido muy largo")
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
export { validationSchema };