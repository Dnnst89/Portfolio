import React from "react";
import BodyComponent from "@/components/BodyComponent";
const detailLayout = ({ children }) => {
  try {
    return (
      <>
        <BodyComponent>
          <section>{children}</section>
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
};

export default detailLayout;
