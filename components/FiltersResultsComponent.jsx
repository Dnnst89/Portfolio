"use client";
import { useQuery } from "@apollo/client";
import ProductFilterContainer from "./ProductFilterContainer";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import toast, { Toaster } from "react-hot-toast";
import getProductsFiltered from "@/src/graphQl/queries/getProductsFiltered";
import getProductsFilteredWithBrands from "@/src/graphQl/queries/getProductsFilteredWithBrands";
import FilterContainer from "./FilterContainer";
import FilterContainerPrincipal from "./FilterContainerPrincipal";
import useFilteredBrand from "@/hooks/useFilteredBrand";
export default function FiltersResultsComponent({ querySearch }) {
  //querySearch me indica el tipo de filtro y el valor del filtro
  const [minPriceFilter, setMinPriceFilter] = useState(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState(999999);
  const [minAgeFilter, setMinAgeFilter] = useState(0);
  const [maxAgeFilter, setMaxAgeFilter] = useState(100);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedAgeRange, setSelectedAgeRange] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryType, setQueryType] = useState();
  const [nbHits, setNbHits] = useState();
  const page = currentPage;
  const pageSize = 12;

  let initialAge;
  let finalAge;
  let category;
  let ageRange;
  let brands; // Brands filters
  brands = selectedBrands;
  let minPrice;
  let maxPrice;

  //separo la query para saber que mostrar si es por rango de dedades o por categorias
  const [filterType, filterValue] = querySearch.split("=");

  if (filterType == "ageRange") {
    initialAge = parseInt(filterValue.split("-")[0]);
    finalAge = parseInt(filterValue.split("-")[1]);
    ageRange = decodeURIComponent(filterValue);
    minPrice = minPriceFilter;
    maxPrice = maxPriceFilter;
  } else if (filterType == "category") {
    category = decodeURIComponent(filterValue); //para transformar el texto con espacios desde el URL
    initialAge = minAgeFilter;
    finalAge = maxAgeFilter;
    minPrice = minPriceFilter;
    maxPrice = maxPriceFilter;
  }
  // Hook que retorna las marcas segun la categoria
  const { loadingBrands, brandsForCheckbox } = useFilteredBrand(category);

  // depending if there´s a brand selected or not we use the necessary query for it, with or without brand variable.
  let queryResultWithBrands = useQuery(getProductsFilteredWithBrands, {
    variables: {
      initialAge,
      finalAge,
      minPrice,
      maxPrice,
      brands,
      page,
      pageSize,
      category,
    },
  });

  let queryResult = useQuery(getProductsFiltered, {
    variables: {
      initialAge,
      finalAge,
      minPrice,
      maxPrice,
      page,
      pageSize,
      category,
    },
  });

  // Using results conditionally
  const { loading, error, data } =
    brands.length > 0 ? queryResultWithBrands : queryResult;

  useEffect(() => {
    //   // Puedes mover la lógica de 'allResults' directamente aquí
    try {
      // Realiza las operaciones necesarias con 'data'
      setQueryType("category");
      initialAge = minAgeFilter;
      finalAge = maxAgeFilter;
      minPrice = minPriceFilter;
      maxPrice = maxPriceFilter;
      const total = data.products.meta.pagination.total;
      setNbHits(total);
      // console.log("resultado1", nbHits);
      // Continúa con el resto del código según tus necesidades
    } catch (err) {
      // Manejar errores si es necesario
    }
  }, [
    minAgeFilter,
    maxAgeFilter,
    maxPriceFilter,
    minPriceFilter,
    data,
    currentPage,
  ]);
  const handleFilters = (
    selectedBrands,
    minAge,
    maxAge,
    minPrice,
    maxPrice
  ) => {
    // Establecer los valores de filtro recibidos
    setMinAgeFilter(minAge);
    setMaxAgeFilter(maxAge);
    setMinPriceFilter(minPrice);
    setMaxPriceFilter(maxPrice);
    setSelectedBrands(selectedBrands);

    // Verificar y corregir valores nulos o indefinidos para minAge y maxAge
    if (minAge === null || minAge === undefined || minAge === "") {
      minAge = 0;
      setMinAgeFilter(0);
    }
    if (maxAge === null || maxAge === undefined || maxAge === "") {
      maxAge = 100;
      setMaxAgeFilter(100);
    }

    // Verificar y corregir valores nulos o indefinidos para minPrice
    if (minPrice === null || minPrice === undefined || minPrice === "") {
      setMinPriceFilter(0);
      minPrice = 0;
    }

    // Verificar y corregir valores nulos o indefinidos para maxPrice
    if (maxPrice === null || maxPrice === undefined || maxPrice === "") {
      setMaxPriceFilter(999999);
      maxPrice = 999999;
    }
    setCurrentPage(0);
    setSelectedAgeRange({ minAge, maxAge });
    setSelectedPriceRange({ minPrice, maxPrice });
  };
  //if (loading) return <Spinner />;
  if (error)
    return toast.error(
      "Lo sentimos, ha ocurrido un error al cargar los datos",
      {
        autoClose: 5000,
      }
    );
  if (!loadingBrands) {
    //if is not loading brands
    return (
      <div
        className={
          loading
            ? "flex flex-wrap max-w-screen-xl m-auto justify-center my-10"
            : ""
        }
      >
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <Toaster />
            <div className="md:flex">
              <div className="md:w-1/2">
                <FilterContainerPrincipal
                  brands={brandsForCheckbox} //brands depending on selected category in NavCategories.jsx
                  test={data}
                  minAgeFilter={minAgeFilter}
                  maxAgeFilter={maxAgeFilter}
                  setMaxAgeFilter={setMaxAgeFilter}
                  setMinAgeFilter={setMinAgeFilter}
                  minPriceFilter={minPriceFilter}
                  maxPriceFilter={maxPriceFilter}
                  setMaxPriceFilter={setMaxPriceFilter}
                  setMinPriceFilter={setMinPriceFilter}
                  selectedBrands={selectedBrands}
                  setSelectedBrands={setSelectedBrands}
                  handleFilters={handleFilters}
                  selectedPriceRange={selectedPriceRange}
                  selectedAgeRange={selectedAgeRange}
                  queryType={queryType}
                  querySearch={querySearch}
                />
              </div>
              <div className="md:w-1/1">
                <div>
                  <h1 className="text-center flex flex-wrap max-w-screen-xl m-auto justify-center my-10">
                    Resultados de productos para niños de{" "}
                    {initialAge === 8
                      ? `${initialAge} o más años`
                      : `${initialAge} - ${finalAge} años`}
                  </h1>

                  <ProductFilterContainer
                    result={data.products}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
