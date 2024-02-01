import { getToken } from "./getToken";

/**
 * Function the request the shipment estimation from Moovin
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
const addProducts = (items) => {
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
const createFakeData = (latitude, longitude) => {
  //console.log(items);

  //console.log("products", addProducts(items));
  const data = {
    pointCollect: {
      latitude: 9.92421981523312,
      longitude: -84.13679786429938,
    },
    pointDelivery: {
      latitude: latitude,
      longitude: longitude,
    },
    listProduct: [
      {
        quantity: 3,
        nameProduct: "Matcha Suri (Costa Rica)",
        description: "",
        size: "S",
        length: 5,
        width: 4.5,
        high: 12,
        weight: 0.4,
        price: 1000,
        codeProduct: "247",
      },
    ],
    ensure: true,
  };
  return data;
};
const createData = (items, latitude, longitude) => {
  //console.log(items);

  //console.log("products", addProducts(items));
  const data = {
    pointCollect: {
      latitude: 9.92421981523312,
      longitude: -84.13679786429938,
    },
    pointDelivery: {
      latitude: latitude,
      longitude: longitude,
    },
    listProduct: addProducts(items),
    ensure: true,
  };
  return data;
};
export { requestEstimation, createData, createFakeData };
