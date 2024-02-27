/**
 * El método realiza una consulta al endpoint de moovin
 * para verificar si la dirección selecionada por el usuario
 * esta dentro o fuera del rango de covertura de moovin en el pais.
 */
import { getToken } from "./getToken";

const coverageArea = async (lat, lng) => {
  const COVERAGE_AREA_MOOVIN_URL = process.env.NEXT_PUBLIC_MOOVIN_COBERTURA;
  try {
    const accessToken = await getToken();
    const coverageResponse = await fetch(
      `${COVERAGE_AREA_MOOVIN_URL}latitude=${lat}&longitude=${lng}`,
      {
        method: "GET",
        headers: {
          token: accessToken,
        },
      }
    );
    if (!coverageResponse.ok) {
      throw new Error(
        "Se ha producido un error al procesar la solicitud de cobertura de zona de Moovin."
      );
    }

    const responseData = await coverageResponse.json();
    return responseData.status;

    // Further processing based on the response data
  } catch (error) {
    console.error(
      "Ha ocurrido un error al realizar la solicitud a los servicios de Moovin.",
      error
    );
  }
};

export default coverageArea;
