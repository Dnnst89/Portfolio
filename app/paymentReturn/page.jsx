// pages/payment-return.js

import React, { useEffect } from "react";
import { useRouter } from "next/navigationter";
import Test from "@/components/Test";
/*
RETURNED DATA
https://localhost:3000/checkout?code=1&description=Transacci%C3%B3n%20aprobada&auth=
123456&order=121315&tpt=917725&crd=&padded=&authorization=&brand=MasterCard&last-digits=
&gateway-transaction=&tilopay-transaction=917725&OrderHash=c0ff14a3c3527a1265e35c7dae22e5bf02be42e141ad0912228995e5306a2f95&returnData=dXNlcl9pZD0xMg==

*/
function PaymentReturn() {
  const router = useRouter();

  useEffect(() => {
    // Get query parameters from the URL
    const { code, description, auth, order, tpt, ...otherParams } =
      router.query;

    // Handle the payment data as needed
    if (code === "1") {
      // Payment was successful
      console.log("Payment Successful:", description);

      // You can update your order status or take other actions here
    } else {
      // Payment failed
      console.error("Payment Failed:", description);
    }

    // Redirect to a thank-you page or another appropriate page
    router.push("/thank-you"); // Replace with your desired destination
  }, [router]);

  return (
    <>
      <p>Processing Payment...</p>
      <Test />
    </>
  );
}

export default PaymentReturn;
