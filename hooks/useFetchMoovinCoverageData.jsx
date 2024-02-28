import coverageArea from "@/api/moovin/coverageArea";
import { MOOVIN_RESPONSE } from "@/helpers/messageTypes";
import { useEffect, useState } from "react";
/**
 *
 * @param {Number} lat - Latitud destino
 * @param {Number} lng - Longitued destino
 * @returns - si moovin esta disponible en la zona retorna true, en caso contrario retorna false.
 * - Errores adaptados segun la respuesta de la peticion.
 * - Mensaje de respuesta segun las cordenadas enviadas.
 */
const useFetchMoovinCoverageData = (lat, lng) => {
  const [moovinMessageError, setMoovinMessageError] = useState("");
  const [blockMoovin, setBlockMoovin] = useState(false);
  const [isMoovinAvailable, setIsMoovinAvailable] = useState(null);

  const fetchMoovinCoverageData = async () => {
    try {
      const response = await coverageArea(lat, lng);

      if (response === MOOVIN_RESPONSE.OUT_OF_COVERAGE) {
        setBlockMoovin(true);
        setIsMoovinAvailable(response);
        setMoovinMessageError(MOOVIN_RESPONSE.ERROR_OUT_OF_COVERAGE);
      } else if (response === MOOVIN_RESPONSE.DANGER_ZONE) {
        setBlockMoovin(true);
        setMoovinMessageError(MOOVIN_RESPONSE.ERROR_DANGER_ZONE);
        setIsMoovinAvailable(response);
      } else {
        setBlockMoovin(false);
        setIsMoovinAvailable(response);
      }
    } catch (error) {
      console.error(MOOVIN_RESPONSE.ERROR_DEFAULT, error);
    }
  };

  fetchMoovinCoverageData();

  // Devolvemos los valores que necesitamos
  return { blockMoovin, moovinMessageError, isMoovinAvailable };
};

export default useFetchMoovinCoverageData;
