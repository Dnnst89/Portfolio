/**
 *
 * @param {Object} items - recibe los productos que necesitan ser estimados para el
 * envio con el servicio de Moovin
 * @returns
 */
const getProductsToEstimate = (items) => {
  if (!items?.length) return [{}];
  return items?.map((item) => {
    return {
      quantity: item?.attributes?.quantity,
      nameProduct:
        item?.attributes?.variant?.data?.attributes?.product?.data?.attributes
          ?.name,
      description:
        item?.attributes?.variant?.data?.attributes?.product?.data?.attributes
          ?.name,
      size: "XS",
      length: 5,
      width: 15,
      high: 10,
      weight: 0.4,
      price: item?.totalItemPrice,
      codeProduct:
        item?.attributes?.variant?.data?.attributes?.product?.data?.attributes?.cabys?.toString(),
    };
  });
};
export default getProductsToEstimate;
