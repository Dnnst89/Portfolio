"use client";
import { useQuery } from "@apollo/client";
import ProductFilterContainer from "./ProductFilterContainer";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import toast, { Toaster } from "react-hot-toast";
import getProductsFiltered from "@/src/graphQl/queries/getProductsFiltered";
import FilterContainer from "./FilterContainer";
import FilterContainerPrincipal from "./FilterContainerPrincipal";

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
  const page = currentPage;
  const pageSize = 12;

  let initialAge;
  let finalAge;
  let category;
  let minPrice;
  let maxPrice

  //separo la query para saber que mostrar si es por rango de dedades o por categorias
  const [filterType, filterValue] = querySearch.split("=");
  if (filterType == "ageRange") {
    initialAge = parseInt(filterValue.split("-")[0]);
    finalAge = parseInt(filterValue.split("-")[1]);
  } else if (filterType == "category") {
    category = decodeURIComponent(filterValue); //para transformar el texto con espacios desde el URL
    initialAge = minAgeFilter;
    finalAge = maxAgeFilter;
    minPrice = minPriceFilter;
    maxPrice = maxPriceFilter;
  }

  const { loading, error, data } = useQuery(getProductsFiltered, {
    variables: { initialAge, finalAge, minPrice, maxPrice, page, pageSize, category },
  });
  useEffect(() => {
    // Puedes mover la lógica de 'allResults' directamente aquí
    try {
      // Realiza las operaciones necesarias con 'data'

      initialAge = minAgeFilter;
      finalAge = maxAgeFilter;
      minPrice = minPriceFilter;
      maxPrice = maxPriceFilter;
      const { hitsPerPage, nbHits, nbPages } = data;
      console.log("resultados", data);
      // Continúa con el resto del código según tus necesidades
    } catch (err) {
      // Manejar errores si es necesario
    }
  }, [minAgeFilter, maxAgeFilter, maxPriceFilter, minPriceFilter, data, currentPage]);

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

    /*
    // Crear filtros para la búsqueda
    const ageFilters = `variants.initialAge <= ${maxAge} AND variants.finalAge >= ${minAge}`;
    const priceFilters = `variants.price >= ${minPrice} AND variants.price <= ${maxPrice}`;

    // Filtros de marca
    const brandFilters = selectedBrands
      .map((brand) => `brand:"${brand}"`)
      .join(" OR ");

    // Combinar todos los filtros
    const combinedFilters = [brandFilters, priceFilters, ageFilters]
      .filter(Boolean)
      .join(" AND ");

    // Decodificar la cadena de consulta
    const decodedQueryString = decodeURIComponent(test.query);

    // Realizar la búsqueda en Algolia con los filtros combinados
    index
      .search(decodedQueryString, {
        filters: combinedFilters,
      })
      .then((response) => {
        setResult(response);
        const { hitsPerPage, nbHits, nbPages } = response;
        setHitsPerPage(hitsPerPage);
        setNbHits(nbHits);
        setNbPages(nbPages);
      });

    // Restablecer la página actual y almacenar los rangos de edad y precio seleccionados
    setCurrentPage(0);
    */
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
          {" "}
          <Toaster />
          <div className="flex flex-wrap max-w-screen-xl m-auto justify-center my-10">
            {filterType == "ageRange" ? (
              <h1 className="text-center">
                Resultados de productos para niños de{" "}
                {initialAge === 8
                  ? `${initialAge} o más años`
                  : `${initialAge} - ${finalAge} años`}
              </h1>
            ) : (
              <h1 className="text-center">
                Resultados de productos de {category}
              </h1>
            )}
          </div>
          <FilterContainerPrincipal
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
          />
          <FilterContainer
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
          />
          <ProductFilterContainer
            result={data.products}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
