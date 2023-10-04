"use client";
import { useQuery } from "@apollo/client";
import getProductByAgeRange from "@/src/graphQl/queries/getProductByAgeRange";
import ProductFilterContainer from "./ProductFilterContainer";
import React, { useState } from "react";
import Spinner from "./Spinner";
import toast, { Toaster } from "react-hot-toast";

export default function AgeResultsComponent({ ageRange }) {
  const [currentPage, setCurrentPage] = useState(1);

  const page = currentPage;
  const pageSize = 10;
  const { loading, error, data } = useQuery(getProductByAgeRange, {
    variables: { ageRange, page, pageSize },
  });

  if (loading) return <Spinner />;
  if (error) return toast.error("Lo sentimos, ha ocurrido un error al cargar los datos", {
    autoClose: 5000
  })


  const { variants } = data;

  return (
    <div>
      <Toaster />
      <ProductFilterContainer
        result={variants}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
