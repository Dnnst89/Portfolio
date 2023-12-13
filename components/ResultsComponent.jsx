"use client";
import ProductContainer from "@/app/layouts/includes/ProductContainer";
import { algoliaInstace } from "@/src/axios/algoliaIntance/config";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "@/components/Spinner";
import FilterContainer from "./FilterContainer";
import algoliasearch from "algoliasearch";

const ResultsComponent = (test) => {

  const [minPriceFilter, setMinPriceFilter] = useState(null);
  const [maxPriceFilter, setMaxPriceFilter] = useState(null);

  const [result, setResult] = useState([]);
  const [hitsPerPage, setHitsPerPage] = useState(null);
  const [nbHits, setNbHits] = useState(null);
  const [nbPages, setNbPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const [selectedBrands, setSelectedBrands] = useState([]);

  async function getHits() {

    console.log(selectedBrands)

    try {
      var url = `/development_api::product.product?query=${test.query}&page=${currentPage}`;

      // Agregar filtros de precio si están presentes
      if (minPriceFilter != null && maxPriceFilter != null) {
        url += `&numericFilters=variants.price>=${minPriceFilter},variants.price<=${maxPriceFilter}`;
      }

      if (selectedBrands.length !== 0) {
        // Concatenar el arreglo selectedBrands usando join y agregarlo a la URL
        const brandsFilter = selectedBrands.map((brand) => `brand:${brand.replace(/\s/g, '_')}`).join(' OR ');
        url += `&filters=${brandsFilter}`;
      }

      console.log(url)
      const { data, statusText, status } = await algoliaInstace.get(url);

      if (statusText !== "OK") {
        toast.error("Lo sentimos, ha ocurrido un error al cargar los datos", {
          autoClose: 5000,
        });
      }
      return data;
    } catch (err) {
      toast.error("Lo sentimos, ha ocurrido un error al cargar los datos", {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, test.query]);


  return (
    <>
      <div className={loading ? "grid place-items-center" : ""}>
        {loading ? <Spinner /> :

          nbHits > 0 ? (
            <div>
              <div className="flex flex-wrap max-w-screen-xl m-auto justify-center my-10">
                <h1>Resultados de &#34;{decodeURIComponent(test.query)}&#34;</h1>
                <FilterContainer test={test} minPriceFilter={minPriceFilter} maxPriceFilter={maxPriceFilter} setMaxPriceFilter={setMaxPriceFilter} setMinPriceFilter={setMinPriceFilter} setCurrentPage={setCurrentPage} setHitsPerPage={setHitsPerPage} setNbHits={setNbHits} setNbPages={setNbPages} setResult={setResult} selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands} />
              </div>
              <ProductContainer
                result={result}
                hitsPerPage={hitsPerPage}
                nbHits={nbHits}
                nbPages={nbPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          ) : (<div className="text-center grid content-center h-80 m-auto"> <h1 className="font-bold">¡Lo sentimos!</h1> <h2>No se encontraron resultados.</h2> </div>)
        }
      </div>
    </>
  );
};

export default ResultsComponent;
