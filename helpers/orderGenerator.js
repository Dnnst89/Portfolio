// utils.js

// Método para generar ID único
// Se genera un ID único para proceso de pago,
// este ID se agrega al request de tilopay

const orderGenerator = () => {
  const date = new Date();

  // Le agregamos el formato correspondiente
  const formattedDate = [
    date.getFullYear().toString(),
    (date.getMonth() + 1).toString().padStart(2, "0"),
    date.getDate().toString().padStart(2, "0"),
    date.getHours().toString().padStart(2, "0"),
    date.getMinutes().toString().padStart(2, "0"),
    date.getSeconds().toString().padStart(2, "0"),
  ].join("");
  return formattedDate;
};

// Exporta la función para usarla en otros archivos
export default orderGenerator;
