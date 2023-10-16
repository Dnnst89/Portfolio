"use client";
import CheckOutHeader from "@/components/CheckoutHeader";
import CheckOutform1 from "../../components/CheckOutform1";
import useProtectionRoute from "@/hooks/useProtectionRoute";
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
