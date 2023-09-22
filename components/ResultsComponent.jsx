"use client";
import ProductContainer from "@/app/layouts/includes/ProductContainer";
import { algoliaInstace } from "@/src/axios/algoliaIntance/config";
import React, { useEffect, useState } from "react";

const ResultsComponent = ({ query }) => {

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
        throw new Error(`Error! status: ${status}`);
      }
      return data;
    } catch (err) {
      console.log(err);
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
    if (!query) return null;
    allResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, query]);

  return (
    <ProductContainer
      result={result}
      hitsPerPage={hitsPerPage}
      nbHits={nbHits}
      nbPages={nbPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
};

export default ResultsComponent;
