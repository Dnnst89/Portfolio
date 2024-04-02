"use client";
import ProductContainer from "@/app/layouts/includes/ProductContainer";
import { algoliaInstace } from "@/src/axios/algoliaIntance/config";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "@/components/Spinner";
import FilterContainer from "./FilterContainer";
import FilterContainerPrincipal from "./FilterContainerPrincipal";
import algoliasearch from "algoliasearch";
import GET_ERROR_INFO from "@/src/graphQl/queries/getErrorInfo";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
const ResultsComponent = (test) => {
  const router = useRouter();
  const [minPriceFilter, setMinPriceFilter] = useState(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState(999999);

  const [minAgeFilter, setMinAgeFilter] = useState(0);
  const [maxAgeFilter, setMaxAgeFilter] = useState(100);

  const [result, setResult] = useState([]);
  const [hitsPerPage, setHitsPerPage] = useState(null);
  const [nbHits, setNbHits] = useState(null);
  const [nbPages, setNbPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedAgeRange, setSelectedAgeRange] = useState(null);

  const APPLICATION_ID = "6TQCC8J5LB";
  const SEARCH_API_KEY = "5a6490a15e1b2c9a3c53d7f8328c3f8d";
  const ALGOLIA_INDEX = "development_api::product.product";

  const searchClient = algoliasearch(APPLICATION_ID, SEARCH_API_KEY);
  const index = searchClient.initIndex(ALGOLIA_INDEX);
  const { data: errorMessage } = useQuery(GET_ERROR_INFO, {
    variables: { id: 13 },
  });
  async function getHits() {
    try {
      if (test.query) {
        var url = `/development_api::product.product?query=${test.query}&page=${currentPage}`;
      } else {
        var url = `/development_api::product.product?query="todo"&page=${currentPage}`;
      }

      // Agregar filtros de precio si están presentes
      if (
        minPriceFilter != null &&
        maxPriceFilter != null &&
        minAgeFilter != null &&
        maxAgeFilter != null
      ) {
        url += `&numericFilters=variants.price>=${minPriceFilter},variants.price<=${maxPriceFilter},variants.initialAge<=${maxAgeFilter},variants.finalAge>=${minAgeFilter}`;
      }

      if (selectedBrands.length !== 0) {
        // Concatenar el arreglo selectedBrands usando join y agregarlo a la URL
        const brandsFilter = selectedBrands
          .map((brand) => `brand:'${brand}'`)
          .join(" OR ");
        url += `&filters=${brandsFilter}`;
      }
      const { data, statusText, status } = await algoliaInstace.get(url);

      if (statusText !== "OK") {
        toast.error(
          errorMessage.errorInformation.data.attributes.error_message,
          {
            autoClose: 5000,
          }
        );
      }
      return data;
    } catch (err) {
      toast.error(errorMessage.errorInformation.data.attributes.error_message, {
        autoClose: 5000,
      });
    }
  }

  async function allResults() {
    try {
      setLoading(true); // Establece loading en true antes de realizar la solicitud
      const result = await getHits();
      const { hitsPerPage, nbHits, nbPages } = result;
      setResult(result);
      setHitsPerPage(hitsPerPage);
      setNbHits(nbHits);
      setNbPages(nbPages);
    } catch (err) {
      // Manejar errores si es necesario
    } finally {
      setLoading(false); // Establece loading en false independientemente del éxito o fallo
    }
  }

  useEffect(() => {
    if (test.query) {
      allResults();
    } else {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, test.query]);

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
    setSelectedAgeRange({ minAge, maxAge });
    setSelectedPriceRange({ minPrice, maxPrice });
  };

  return (
    <div className={loading ? "grid place-items-center" : ""}>
      {loading ? (
        <Spinner />
      ) : (
        <div className="mx-auto">
          <div className="md:flex ">
            <FilterContainer
              test={test}
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
            <FilterContainerPrincipal
              test={test}
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
            <div
              className={
                nbHits === 0 ? "my-10 my-30 md:ml-96" : "my-10 mx-auto"
              }
            >
              <div className="w-full">
                <h1 className="text-center">
                  Resultados de &#34;{decodeURIComponent(test.query)}&#34;
                </h1>
                <ProductContainer
                  result={result}
                  hitsPerPage={hitsPerPage}
                  nbHits={nbHits}
                  nbPages={nbPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  loading={loading}
                  setLoading={setLoading}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsComponent;
