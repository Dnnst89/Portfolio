import { getToken } from "./getToken";
/*"idEstimation": 206923,
  "idDelivery": 2,
  "idOrder": "",
  "email": "support@shop-feedback.com",
  "emailAccount": "support@shop-feedback.com",
   "pointCollect": {
    "latitude": 9.949798,
    "longitude": -84.194217,
     "name": "Javier Hernandez",
      "phone": "50688998899",
       "notes": "Carretera lindora"
  },
  "pointDelivery": {
    "latitude": 9.94793,
    "longitude": -84.162222,
    "locationAlias": "Autopista 27",
    "name": "Javier Hernandez",
    "identificationCard": "",
    "phone": "50688998899",
    "notes": "EBAIS Candelaria 50 mtrs al nte y 50 mts al ote, casa amarilla a 1 ca de calle principal carr vieja de naranjo 20705, Alajuela, Palmares, Candelaria",
    "documents": [
      {
        "name": "Boleta",
        "fields": [
          {
            "name": "Foto con firma del cliente",
            "type": "image",
            "description": ""
          }
        ]
      }
    ]
  },
  "listProduct": [
     {
      "quantity": 3,
      "nameProduct": "Matcha Suri (Costa Rica)",
      "description": "",
      "size": "S",
     "length": 5,
      "width": 4.5,
      "high": 12,
      "weight": 0.4,
      "price": 12000,
      "codeProduct": "247"
    }
  ]
}*/
/**
 * Function the request the shipment estimation from Moovin
 */
const CreateOrder = async (data) => {
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
  console.log("estimationResponsde: ", order.optionService[1]);
  return order.optionService[1];
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

const createData = (
  store,
  items,
  order,
  client,
  estimation,
  latitude,
  longitude
) => {
  console.log(items);

  const data = {
    idEstimation: estimation,
    idDelivery: 2,
    idOrder: order,
    email: store.email,
    emailAccount: store.email,
    pointCollect: {
      latitude: 9.92421981523312,
      longitude: -84.13679786429938,
      name: store.name,
      phone: "50688998899",
      notes: store.otherSigns,
    },
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
export { CreateOrder, createData };
