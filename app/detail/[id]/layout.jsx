import React from "react";
import BodyComponent from "@/components/BodyComponent";
const detailLayout = ({ children }) => {
  return (
    <>
      <BodyComponent>
        <main>{children}</main>
      </BodyComponent>
    </>
  );
};

export default detailLayout;
