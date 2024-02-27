/*
    Nos ayuda a mostrar los error en nuestro codigo evitando 
    que se realizen modificaciones directas en los mensajes de erro.
*/
export const MOOVIN_RESPONSE = Object.freeze({
  OUT_OF_COVERAGE: "ERRORZONE",
  ERROR_OUT_OF_COVERAGE: `Este método de envío no se encuentra disponible en la zona de entrega
   indicada ya que se ubica fuera del área de cobertura del proveedor del servicio.`,
  DANGER_ZONE: "ERRORDANGERZONE",
  ERROR_DANGER_ZONE: `Este método de envío no se encuentra disponible en la zona de entrega
   indicada por restricciones del proveedor del servicio.`,
  ERROR_DEFAULT:
    "Se ha producido un error al verificar las zona de cobertura de Moovin",
  OPTION_SERVICE_TYPE: "route",
});
