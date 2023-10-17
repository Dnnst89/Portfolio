"use client";
import ProductContainer from "@/app/layouts/includes/ProductContainer";
import { algoliaInstace } from "@/src/axios/algoliaIntance/config";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ResultsComponent = ({ query = "" }) => {
  const [result, setResult] = useState([]);
  const [hitsPerPage, setHitsPerPage] = useState(null);
  const [nbHits, setNbHits] = useState(null);
  const [nbPages, setNbPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  async function getHits() {
    try {
      const { data, statusText, status } = await algoliaInstace.get(
        `/development_api::product.product?query=${query}&page=${currentPage}`
      );
      if (statusText !== "OK") {

        toast.error("Lo sentimos, ha ocurrido un error al cargar los datos", {
          autoClose: 5000
        })
      }
      return data;
    } catch (err) {
      toast.error("Lo sentimos, ha ocurrido un error al cargar los datos", {
        autoClose: 5000
      })
    }
  }

  async function allResults() {
    const result = await getHits();
    const { hitsPerPage, nbHits, nbPages } = result;
    setResult(result);
    setHitsPerPage(hitsPerPage);
    setNbHits(nbHits);
    setNbPages(nbPages);
  }

  useEffect(() => {
    if (query) {
      allResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, query]);

  return (
    <div>
      <div className="flex flex-wrap max-w-screen-xl m-auto justify-center my-10">
        {/* <h1>Resultados de "{decodeURIComponent(query)}"</h1> */}
      </div>
      <Toaster />
      <ProductContainer
        result={result}
        hitsPerPage={hitsPerPage}
        nbHits={nbHits}
        nbPages={nbPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ResultsComponent;
