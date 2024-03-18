"use client";

import BodyComponent from "@/components/BodyComponent";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import React from "react";
import toast from "react-hot-toast";
export default function AdressLayout({ children }) {
  try {
    return (
      <>
        <BodyComponent>
          <main>{children}</main>
        </BodyComponent>
      </>
    );
  } catch (error) {
    toast.error(
      "Lo sentimos, ha ocurrido un error al actualizar la información",
      {
        autoClose: 5000,
      }
    );
  }
}
