"use client";

import Product from "@/components/Product";
import ProductContainer from "@/app/layouts/includes/ProductContainer";

import ToogleSideBar from "@/components/ToogleSideBar";
import React from "react";
import Navbar from "./includes/Navbar";
import TopMenu from "./includes/TopMenu";
import SideBar from "./includes/SideBar";

const MainLayout = ({ children }) => {
  return (
    <>
      <div>
        <TopMenu />
        <Navbar />
      </div>

      <main>{children}</main>

      <div>foot</div>
    </>
  );
};

export default MainLayout;
