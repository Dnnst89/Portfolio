"use client";
import "../../styles/checkout.page.css";
import CheckOutForm1 from "@/components/CheckOutForm1";
import CheckOutForm2 from "@/components/CheckOutForm2";
import CheckOutForm3 from "@/components/CheckOutForm3";
import CheckOutHeader from "@/components/CheckoutHeader";
import { login } from "../../api/tilopay/login";
export default function CheckOut() {
  const accessCredential = login();
  console.log("from checkout", accessCredential);
  return (
    <div>
      <CheckOutHeader />
      <CheckOutForm1 />
      <CheckOutForm2 />
      <CheckOutForm3 />
    </div>
  );
}
