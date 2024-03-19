"use client";

import BodyComponent from "@/components/BodyComponent";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import GET_ERROR_INFO from "@/src/graphQl/queries/getErrorInfo";
import { Toaster, toast } from "react-hot-toast";
import React from "react";
import { useQuery } from "@apollo/client";
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
