"use client";
import CheckOutForm1 from "@/components/CheckOutForm1";
import CheckOutForm2 from "@/components/CheckOutForm2";
import CheckOutHeader from "@/components/CheckoutHeader";

const CheckOut = () => {
  return (
    <div>
      <CheckOutHeader />
      <CheckOutForm1 />
      <CheckOutForm2 />
    </div>
  );
};

export default CheckOut;
