"use client";
import CheckOutForm1 from "@/components/CheckOutForm1";

import CheckOutHeader from "@/components/CheckoutHeader";
import FormOne from "../../components/FormOne";

const CheckOut = () => {
  return (
    <div>
      <CheckOutHeader regresar={"/cart"} />
      <FormOne />
    </div>
  );
};

export default CheckOut;
