import { getToken } from "./getToken";

const data = {
  pointCollect: {
    latitude: 9.929652,
    longitude: -84.134719,
  },
  pointDelivery: {
    latitude: 9.969548,
    longitude: -84.123881,
  },

  listProduct: [
    {
      quantity: 1,
      nameProduct: "Samsumg",
      description: "Galaxy S7",
      size: "S",
      weight: 0.4,
      price: 200000,
      codeProduct: "234234234234",
    },
    {
      quantity: 1,
      nameProduct: "clock",
      description: "LG color Rojo",
      size: "S",
      weight: 0.1,
      price: 12000,
      codeProduct: "234234234234",
    },
  ],
  ensure: true,
};
/**
 * Function the request the shipment estimation from Moovin
 */
export async function requestEstimation() {
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
  console.log("estimationResponsde: ", estimationResponsde);
}
