import { getToken } from "./getToken";

/**
 *
 * @param {Object} data - Productos y caracteristicas para obtener la estimacion.
 * @returns - Estimacion final.
 */
const requestEstimation = async (data) => {
  const accessToken = await getToken();
  const estimationResponsde = await fetch(
    process.env.NEXT_PUBLIC_MOOVIN_ESTIMATION,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: accessToken,
      },
      body: JSON.stringify(data),
    }
  );
  const estimation = await estimationResponsde.json();
  return estimation;

};
export default requestEstimation;
