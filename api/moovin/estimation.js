import { getToken } from "./getToken";

const data = {
  pointCollect: {
    latitude: 9.949798,
    longitude: -84.194217,
  },
  pointDelivery: {
    latitude: 9.94793,
    longitude: -84.162222,
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
      price: 12000,
      codeProduct: "247",
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
  const estimation = await estimationResponsde.json();
  console.log("estimationResponsde: ", estimation);
}
