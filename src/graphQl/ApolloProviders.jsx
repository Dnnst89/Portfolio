"use client";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./config";

const ApolloProviders = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviders;
