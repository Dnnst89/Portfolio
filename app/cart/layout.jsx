"use client";

import BodyComponent from "@/components/BodyComponent";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import React from "react";
const CartLayout = ({ children }) => {
  return (
    <>
      <ProtectedRoutes>
        <BodyComponent>
          <main>{children}</main>
        </BodyComponent>
      </ProtectedRoutes>
    </>
  );
};

export default CartLayout;
