"use client";
import CheckOutForm1 from "@/components/CheckOutForm1";

import CheckOutHeader from "@/components/CheckoutHeader";

const CheckOut = () => {
  return (
    <div>
      <CheckOutHeader regresar={"/cart"} />
      <CheckOutForm1 isCheckout />

    </div>
  );
};

export default CheckOut;
