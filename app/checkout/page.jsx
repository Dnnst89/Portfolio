"use client";
import CheckOutHeader from "@/components/CheckoutHeader";
import useProtectionRoute from "@/hooks/useProtectionRoute";
import "../../styles/fonts.css";
import FormOne from "@/components/FormOne";

const CheckOut = () => {
  try {
    useProtectionRoute();
    return (
      <div>
        <CheckOutHeader regresar={"/cart"} />
        <FormOne />
      </div>
    );
  } catch (error) {
    //  alert(error);
  }
};

export default CheckOut;
