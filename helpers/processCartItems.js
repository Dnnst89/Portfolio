const processCartItems = (items, errors, setErrors) => {
  // Lógica de procesamiento de datos
  return items.map((item) => {
    if (
      item.attributes.variant.data &&
      item.attributes.variant.data.attributes.product.data
    ) {
      // Elimina idVariant del arreglo error si ya no hay error
      if (errors.errorStock.includes(item.attributes.variant.data.id)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          errorStock: prevErrors.errorStock.filter(
            (errorId) => errorId !== item.attributes.variant.data.id
          ),
        }));
      }
      if (
        item.attributes.quantity > item.attributes.variant.data.attributes.stock
      ) {
        // Almacena el objeto completo en un arreglo en Error si lleva mas cantidad de lo que hay en stock
        setErrors((prevErrors) => ({
          ...prevErrors,
          errorStock: [
            ...prevErrors.errorStock,
            item.attributes.variant.data.id,
          ],
        }));
      }

      return {
        totalItemPrice:
          item.attributes.variant.data.attributes.totalPrice *
          item.attributes.quantity,
        quantity: item.attributes.quantity,
        ...item,
      };
    }
    return null; // lo asigno null para filtrarlo luego y no agregarlo a los items
  });
};

export default processCartItems;
