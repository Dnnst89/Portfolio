"use client";

import BodyComponent from "@/components/BodyComponent";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import React from "react";
const CartLayout = ({ children }) => {
  return (
    <>

      <BodyComponent>
        <section>{children}</section>
      </BodyComponent>

    </>
  );
};

export default CartLayout;
