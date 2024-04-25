import { getToken } from "./getToken";

/**
 * Function the request the shipment estimation from Moovin
 */
const orderMoovin = async (data) => {
  const accessToken = await getToken();
  const creationResponsde = await fetch(process.env.NEXT_PUBLIC_MOOVIN_ORDER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: accessToken,
    },
    body: JSON.stringify(data),
  });
  const order = await creationResponsde.json();
  console.log("orderResponsde: ", order);
  return order;
};
const deleteOrderMoovin = async (data) => {
  const accessToken = await getToken();
  const deleteResponsde = await fetch(
    process.env.NEXT_PUBLIC_MOOVIN_DELETE_ORDER,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: accessToken,
      },
      body: JSON.stringify(data),
    }
  );
  const order = await deleteResponsde.json();
  console.log("orderResponsde: ", order);
  return order;
};

const addProducts = (items) => {
  if (!items?.length) return [{}];
  return items?.map((item) => {
    return {
      quantity: item?.quantity,
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
      weight: item?.attributes?.variant?.data?.attributes?.weight,
      price: item?.totalItemPrice,
      codeProduct:
        item?.attributes?.variant?.data?.attributes?.product?.data?.attributes?.cabys?.toString(),
    };
  });
};

const createOrderData = (
  store,
  items,
  order,
  client,
  payment,
  deliveryInformation
) => {
  const data = {
    idEstimation: payment,
    idDelivery: 2,
    idOrder: order,
    email: store.email,
    emailAccount: store.email,
    pointCollect: {
      latitude: store.latitude,
      longitude: store.longitude,
      name: store.name,
      phone: store.phoneNumber,
      notes: store.otherSigns,
    },
    pointDelivery: {
      latitude: deliveryInformation.latitude,
      longitude: deliveryInformation.longitude,
      locationAlias: "",
      name: client.name,
      identificationCard: client.idNumber || "",
      phone: client.phone,
      notes: deliveryInformation.addressLine1,
      documents: [
        {
          name: "Boleta",
          fields: [
            {
              name: "Foto con firma del cliente",
              type: "image",
              description: "",
            },
          ],
        },
      ],
    },
    listProduct: addProducts(items),
    ensure: true,
  };
  return data;
};

export { orderMoovin, createOrderData, deleteOrderMoovin };
