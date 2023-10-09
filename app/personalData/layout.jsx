"use client";

import BodyComponent from "@/components/BodyComponent";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import React from "react";
export default function PersonalDataLayout({ children }) {
  return (
    <>
      <BodyComponent>
        <main>{children}</main>
      </BodyComponent>
    </>
  );
}
