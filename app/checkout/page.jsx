"use client";
import CheckOutHeader from "@/components/CheckoutHeader";
import CheckOutform1 from "../../components/FormOne";
import useProtectionRoute from "@/hooks/useProtectionRoute";
import "../../styles/fonts.css";

const CheckOut = () => {
  useProtectionRoute()
  return (
    <div>
      <CheckOutHeader regresar={"/cart"} />
      
      <CheckOutform1 />
      
      
    </div>
  );
};

export default CheckOut;
