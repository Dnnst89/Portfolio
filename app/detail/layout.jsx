import React from "react";
import BodyComponent from "@/components/BodyComponent";
const detailLayout = ({ children }) => {
  return (
    <>
      <BodyComponent>
        <section>{children}</section>
      </BodyComponent>
    </>
  );
};

export default detailLayout;
