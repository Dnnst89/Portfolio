import React from "react";
import NavMenu from "@/app/layouts/includes/NavMenu";
import NavCategories from "@/app/layouts/includes/NavCategories";
import Footer from "@/app/layouts/includes/Footer";

const BodyComponent = ({ children }) => {
  return (
    <>
      <NavMenu />
      <main>
      {/* <NavCategories /> */}
      {children}
      </main>
      <Footer />
    </>
  );
};

export default BodyComponent;
