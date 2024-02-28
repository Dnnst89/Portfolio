import getProductsToEstimate from "@/api/moovin/getProductsToEstimate";
/**
 *
 * @param {Object} items - Productos para estimar.
 * @param {Number} latitude - Latitud del punto de entrega.
 * @param {Number} longitude - Longitued del punto de entrega.
 * @returns
 */
const createEstimationMoovinRequest = (items, latitude, longitude) => {
  const collectionCoordinates = {
    latitude: 9.92421981523312,
    longitude: -84.13679786429938,
  };
  const data = {
    pointCollect: {
      latitude: collectionCoordinates.latitude,
      longitude: collectionCoordinates.longitude,
    },
    pointDelivery: {
      latitude: latitude,
      longitude: longitude,
    },
    listProduct: getProductsToEstimate(items),
    ensure: true,
  };
  return data;
};
export default createEstimationMoovinRequest;
