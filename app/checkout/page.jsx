"use client";
import CheckOutHeader from "@/components/CheckoutHeader";
import useProtectionRoute from "@/hooks/useProtectionRoute";
import "../../styles/fonts.css";
import FormOne from "@/components/FormOne";

const CheckOut = () => {
  useProtectionRoute();
  return (
    <div>
      <CheckOutHeader regresar={"/cart"} />
      <FormOne />
    </div>
  );
};

export default CheckOut;
