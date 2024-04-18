/*nuevo*/
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
import NotFound from "./Not-found";
import useFilteredBrand from "@/hooks/useFilteredBrand";
import useBrandsByAgeRange from "@/hooks/useBrandsByAgeRange";
import { useRouter } from "next/navigation";
import GET_ERROR_INFO from "@/src/graphQl/queries/getErrorInfo";
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
  const [showToastMessage, setShowToastMessage] = useState(true);

  const { data: errorMessage } = useQuery(GET_ERROR_INFO, {
    variables: { id: 3 },
  });

  let initialAge;
  let finalAge;
  let category;
  let brands; // Brands filters
  brands = selectedBrands;
  let minPrice;
  let maxPrice;
  const router = useRouter();

  let [filterType, filterValue] = "";

  if (querySearch) {
    [filterType, filterValue] = querySearch.split("=");
  }

  //separo la query para saber que mostrar si es por rango de dedades o por categorias

  if (filterType == "ageRange") {
    initialAge = parseInt(filterValue.split("-")[0]);
    finalAge = parseInt(filterValue.split("-")[1]);
    minPrice = minPriceFilter;
    maxPrice = maxPriceFilter;
  } else if (filterType == "category") {
    category = decodeURIComponent(filterValue); //para transformar el texto con espacios desde el URL
    initialAge = minAgeFilter;
    finalAge = maxAgeFilter;
    minPrice = minPriceFilter;
    maxPrice = maxPriceFilter;
  }
  // Hook que retorna las marcas tomando como referencia la categoria
  const { loadingBrands, brandsForCheckbox } = useFilteredBrand(category);
  //Hook que retorna las marcas segun una edad inicial y una edad final
  const {
    loading: loadBrandsByAge,
    data: getBrandsByAgeData,
    getBrandsByAge,
  } = useBrandsByAgeRange(initialAge, finalAge);
  useEffect(() => {
    getBrandsByAge();
  }, [getBrandsByAge]);

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
      if (showToastMessage) {
        if (filterValue === undefined || filterType === undefined) {
          toast.error(
            errorMessage.errorInformation.data.attributes.error_message,
            {
              autoClose: 9000,
            }
          );
          setShowToastMessage(false);

          router.push("/not-found");
        }

        //router.push("/not-found");
      }
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
    showToastMessage,
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
      errorMessage.errorInformation.data.attributes.error_message,
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
            <div className=" sm:flex justify-center mt-10">
              <div className="hidden md:block sm:w-1/4 p-2">
                <FilterContainerPrincipal
                  /**
                   * Se toma como referencia la seccion en que se esta ubicado
                   * para enviar la data segun categoria o segun edades.
                   */
                  brandsForCheckbox={
                    filterType === "category"
                      ? brandsForCheckbox
                      : getBrandsByAgeData
                  }
                  test={data}
                  filterType={filterType}
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
                  result={data.products}
                />
              </div>

              <div className="sm:w-3/4">
                <div className="w-full">
                  {filterType === "ageRange" ? (
                    <h1 className="text-center flex flex-wrap max-w-screen-xl m-auto justify-center my-10">
                      Resultados de productos para niños de{" "}
                      {initialAge === 8
                        ? `${initialAge} o más años`
                        : `${initialAge} - ${finalAge} años`}
                    </h1>
                  ) : nbHits === 0 ? (
                    <div className="text-center flex flex-col items-center justify-center h-80">
                      <div className="w-full text-center  mb-4">
                        <h1 className=" text-center">
                          Resultados de &#34;{decodeURIComponent(category)}
                          &#34;
                        </h1>
                      </div>
                      <div>
                        <h1 className="font-bold mb-2">¡Lo sentimos!</h1>
                        <h2>No se encontraron resultados.</h2>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="w-full text-center">
                        <h1 className="text-center">
                          Resultados de &#34;{decodeURIComponent(category)}
                          &#34;
                        </h1>
                      </div>
                    </div>
                  )}
                  <FilterContainer
                    brandsForCheckbox={
                      filterType === "category"
                        ? brandsForCheckbox
                        : getBrandsByAgeData
                    }
                    test={data}
                    filterType={filterType}
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
                    result={data.products}
                  />
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
