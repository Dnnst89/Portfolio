export const paymentDataForm = {
  redirect: "http://detinmarin.s3-website-us-west-2.amazonaws.com/thankyou", // Fix the URL format
  key: process.env.NEXT_PUBLIC_TILOPAY_API_KEY,
  amount: "",
  currency: "CRC",
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
//http://detinmarin.s3-website-us-west-2.amazonaws.com/thankyou
