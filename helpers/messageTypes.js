/*
    Nos ayuda a mostrar los error en nuestro codigo evitando 
    que se realizen modificaciones directas en los mensajes de error.
*/
export const MOOVIN_RESPONSE = Object.freeze({
  OUT_OF_COVERAGE: "ERRORZONE",
  ERROR_OUT_OF_COVERAGE: `Este método de envío no se encuentra disponible en la zona de entrega
   indicada ya que se ubica fuera del área de cobertura del proveedor del servicio.`,
  DANGER_ZONE: "ERRORDANGERZONE",
  ERROR_DANGER_ZONE: `Este método de envío no se encuentra disponible en la zona de entrega
   indicada por restricciones del proveedor del servicio.`,
  ERROR_DEFAULT:
    "Se ha producido un error al verificar las zona de cobertura de Moovin.",
  OPTION_SERVICE_TYPE: "route",
  ERROR_LIST_PRODUCT: "La lista de productos a entregar se encuentra vacía.",
  ERROR_WEIGHT:
    "Uno de los productos sobrepasa el peso permitido para transportar.",
  ERROR_SIZE:
    "El paquete sobrepasa las dimensiones permitidas para ser transportado.",
  OUT_COUNTRY_IN_MOOVIN:
    "El paquete de envio internacional debe contar con el punto de recolección en la terminal correspondiente.",
});
