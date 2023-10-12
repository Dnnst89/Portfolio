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
  const pageSize = 12;
  const { loading, error, data } = useQuery(getProductByAgeRange, {
    variables: { ageRange, page, pageSize },
  });
  //if (loading) return <Spinner />;
  if (error) return toast.error("Lo sentimos, ha ocurrido un error al cargar los datos", {
    autoClose: 5000
  })

  return (
    <div className={loading ? "flex flex-wrap max-w-screen-xl m-auto justify-center my-10" : ""}>
      {loading ? <Spinner /> : <div> <Toaster />
        <ProductFilterContainer
          result={data.products}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        /></div>}

    </div>
  );
}
