"use client";
import { useQuery } from "@apollo/client";
import getProductByAgeRange from "@/src/graphQl/queries/getProductByAgeRange";
import ProductFilterContainer from "./ProductFilterContainer";
import React, { useState } from "react";
import Spinner from "./Spinner";
import toast, { Toaster } from "react-hot-toast";

export default function AgeResultsComponent({ ageRange }) {

  const [currentPage, setCurrentPage] = useState(1);

  const initialAge = parseInt(ageRange.split("-")[0]);
  const finalAge = parseInt(ageRange.split("-")[1]);
  const page = currentPage;
  const pageSize = 12;
  const { loading, error, data } = useQuery(getProductByAgeRange, {
    variables: { initialAge, finalAge, page, pageSize },
  });
  //if (loading) return <Spinner />;
  if (error) return toast.error("Lo sentimos, ha ocurrido un error al cargar los datos", {
    autoClose: 5000
  })

  return (
    <div className={loading ? "grid place-items-center" : ""}>
      {loading ? <Spinner /> : <div> <Toaster />
        <ProductFilterContainer
          result={data.products}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        /></div>}

    </div>
  );
}
