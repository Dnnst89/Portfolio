// paymentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  redirect: "https://localhost:3000/checkout", // Fix the URL format
  key: process.env.NEXT_PUBLIC_TILOPAY_API_KEY,
  amount: 0,
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

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setPaymentData } = paymentSlice.actions;
export default paymentSlice.reducer;
