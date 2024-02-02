/**Calcula la distancia entre dos coordenadas geograficas usando la formula Haversine
 * @param {number} StoreLatitude La latitud de la tienda fisica.
 * @param {number} StoreLongitude La longitud de la tienda fisica.
 * @param {number} googleMapsLat La latitud del punto de destino.
 * @param {number} googleMapsLng La longitued del punto de destino.
 * @returns {boolean} retorna true si la distancia entre los dos puntos es mayor a 20 kilometros
 * en caso contrario retorna false.
 */
const calculateShippingDistance = async (
  StoreLatitude,
  StoreLongitude,
  googleMapsLat,
  googleMapsLng
) => {
  console.log(StoreLatitude, StoreLongitude);
  // Convertir todas las coordenadas a radianes
  const lat1 = radGrades(StoreLatitude);
  const lon1 = radGrades(StoreLongitude);
  const lat2 = radGrades(googleMapsLat);
  const lon2 = radGrades(googleMapsLng);
  /**
   * El radio de la tierra difiere dependiendo de que parte
   *  de la misma estemos midiendo, por esta razón
   * tomamos como referencia el radio ecuatorial.
   */
  const EARTH_RADIUS_IN_KILOMETERS = 6371;

  let differenceBetweenLengths = lon2 - lon1;
  let differenceBetweenLatitudes = lat2 - lat1;
  let a =
    Math.pow(Math.sin(differenceBetweenLengths / 2.0), 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.pow(Math.sin(differenceBetweenLatitudes / 2.0), 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceExeedTweentyKilometres = (
    EARTH_RADIUS_IN_KILOMETERS * c
  ).toFixed(0);
  return distanceExeedTweentyKilometres > 20 ? true : false;
};
export default calculateShippingDistance;
/**
 * Se defina una función radGrades(grados radianes) que convierte los grados a radianes.
 * La conversión es necesaria porque la fórmula para calcular la distancia
 * en kilómetros entre dos puntos en la superficie de la Tierra requiere
 * radianes en lugar de grados.
 * @param {grades} grades
 * @returns
 */
const radGrades = (grades) => {
  return (grades * Math.PI) / 180;
};
