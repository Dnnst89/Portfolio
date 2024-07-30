const formatTaxData = (unitaryPrice, qty, cabys) => {
  if (!variant) return [];
    return {
      measurementUnit: "1/m",
      unitaryPrice: unitaryPrice,
      qty: qty,
      cabys: cabys.toString(),
    };
};

export default formatTaxData;
