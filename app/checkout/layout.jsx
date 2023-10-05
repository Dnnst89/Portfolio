import ProtectedRoutes from "@/components/ProtectedRoutes";
import React from "react";

const CheckoutLayout = ({ children }) => {
  return (
    <>
      <ProtectedRoutes>{children}</ProtectedRoutes>
    </>
  );
};

export default CheckoutLayout;
