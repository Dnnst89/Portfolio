export const paymentDataForm = {
  redirect:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/thankyou/"
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}/thankyou/`,
  key: process.env.NEXT_PUBLIC_TILOPAY_API_KEY,
  amount: "",
  currency: "USD",
  billToFirstName: "",
  billToLastName: "",
  billToAddress: "",
  billToAddress2: "",
  billToCity: "",
  billToState: "",
  billToZipPostCode: "",
  billToCountry: "CR",
  billToTelephone: "",
  billToEmail: "",
  orderNumber: "",
  capture: "1",
  subscription: "0",
  platform: "api",
  returnData: "dXNlcl9pZD0xMg==",
  hashVersion: "V2",
};
