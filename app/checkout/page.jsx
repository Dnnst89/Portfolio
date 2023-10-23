"use client";
import CheckOutHeader from "@/components/CheckoutHeader";
import CheckOutform1 from "../../components/FormOne";
import NewForm from "../../components/NewForm"
import useProtectionRoute from "@/hooks/useProtectionRoute";
import "../../styles/fonts.css";

const CheckOut = () => {
  useProtectionRoute()
  return (
    <div>
      <CheckOutHeader regresar={"/cart"} />

      <NewForm />


    </div>
  );
};

export default CheckOut;
