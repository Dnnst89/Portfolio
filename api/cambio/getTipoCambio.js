import axios from "axios";

const getTipoCambio = async () => {
  try {
    // Realiza la solicitud GET al endpoint del Ministerio de Hacienda
    const fechaActual = new Date();
    const formattedDate = `${fechaActual.getFullYear()}/${
      fechaActual.getMonth() + 1
    }/${fechaActual.getDate()}`;
    const apiUrl = `https://tipodecambio.paginasweb.cr/api/${formattedDate}`;
    const response = await axios.get(apiUrl);

    // Analiza la respuesta y extrae el tipo de cambio u otra información relevante
    const tipoCambio = response.data;

    return tipoCambio;
  } catch (error) {
    console.error(
      "Error al obtener el tipo de cambio del Ministerio de Hacienda:",
      error
    );
    const tipoCambio = { compra: 527 };
    return tipoCambio;
  }
};
export default getTipoCambio;
