"use client";
import { useQuery } from "@apollo/client";
import ProductFilterContainer from "./ProductFilterContainer";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import toast, { Toaster } from "react-hot-toast";
import getProductsFiltered from "@/src/graphQl/queries/getProductsFiltered";

export default function FiltersResultsComponent({ querySearch }) {
  //querySearch me indica el tipo de filtro y el valor del filtro
  const [currentPage, setCurrentPage] = useState(1);
  const page = currentPage;
  const pageSize = 12;

  let initialAge;
  let finalAge;
  let category;

  //separo la query para saber que mostrar si es por rango de dedades o por categorias
  const [filterType, filterValue] = querySearch.split('=');
  if (filterType == "ageRange") {
    initialAge = parseInt(filterValue.split("-")[0]);
    finalAge = parseInt(filterValue.split("-")[1]);
  } else if (filterType == "category") {
    category = decodeURIComponent(filterValue); //para transformar el texto con espacios desde el URL
  }

  const { loading, error, data } = useQuery(getProductsFiltered, {
    variables: { initialAge, finalAge, page, pageSize, category },
  });


  //if (loading) return <Spinner />;
  if (error) return toast.error("Lo sentimos, ha ocurrido un error al cargar los datos", {
    autoClose: 5000
  })

  return (
    <div className={loading ? "flex flex-wrap max-w-screen-xl m-auto justify-center my-10" : ""}>
      {loading ? <Spinner /> : <div> <Toaster />
        <div className="flex flex-wrap max-w-screen-xl m-auto justify-center my-10">
          {filterType == "ageRange" ?
            <h1 className="text-center">Resultados de productos para niños de {initialAge === 8 ? `${initialAge} o más años` : `${initialAge} - ${finalAge} años`}</h1>
            :
            <h1 className="text-center">Resultados de productos  de {category}</h1>

          }

        </div>
        <ProductFilterContainer
          result={data.products}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        /></div>}

    </div>
  );
}
