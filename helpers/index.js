import axios from "axios";
const getAccessToken = async () => {
  const body = {
    grant_type: "client_credentials",
    client_id: "detinmarin_client",
    client_secret: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET,
    scope: "openid profile email",
  };
  const { data } = await axios.post(process.env.NEXT_PUBLIC_KEYCLOAK_URL, body, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return data?.access_token;
};

const formatTaxData = (items) => {
  if (!items?.length) return [];
  return items?.map((item) => {
    return {
      measurementUnit: "Sp",
      unitaryPrice: item?.attributes?.variant?.data?.attributes?.price,
      qty: item?.quantity,
      cabys:
        item?.attributes?.variant?.data?.attributes?.product?.data?.attributes
          ?.cabys?.toString(),
    };
  });
};

export { getAccessToken, formatTaxData };
