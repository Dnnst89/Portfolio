import Navbar from "@/app/layouts/includes/Navbar";
import TopMenu from "@/app/layouts/includes/TopMenu";
import React from "react";

const detailLayout = ({ children }) => {
  return (
    <>
      <div>
        <TopMenu />
        <Navbar />
      </div>

      <main>{children}</main>
    </>
  );
};

export default detailLayout;
