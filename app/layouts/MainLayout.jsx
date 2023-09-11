"use client";

import Product from "@/components/Product";
import ProductContainer from "@/app/layouts/includes/ProductContainer";

import ToogleSideBar from "@/components/ToogleSideBar";
import React from "react";
import Navbar from "./includes/Navbar";
import TopMenu from "./includes/TopMenu";
import SideBar from "./includes/SideBar";
import { useQuery } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import client from "@/src/graphQl/config";

const MainLayout = ({ children }) => {
  return (
    <>
      <ApolloProvider client={client}>
        <div>
          <TopMenu />
          <Navbar />
        </div>

        <main>{children}</main>

        <div>foot</div>
      </ApolloProvider>
    </>
  );
};

export default MainLayout;
