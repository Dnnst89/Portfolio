"use client";
import { useEffect, useState } from "react";
import Navbar from "@/app/layouts/includes/Navbar";
import TopMenu from "@/app/layouts/includes/TopMenu";
import ProductContainer from "@/app/layouts/includes/ProductContainer";

export default function GetResults({ params }) {
  const [result, setResult] = useState([]);
  const [hitsPerPage, setHitsPerPage] = useState(null);
  const [nbHits, setNbHits] = useState(null);
  const [nbPages, setNbPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const { q } = params;

  async function getHits() {
    try {
      const response = await fetch(
        `https://6TQCC8J5LB.algolia.net/1/indexes/development.product?query=${q}&page=${currentPage}`,
        {
          headers: {
            "X-Algolia-Api-Key": "5a6490a15e1b2c9a3c53d7f8328c3f8d",
            "X-Algolia-Application-Id": "6TQCC8J5LB",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const hits = await response.json();
      return hits;
    } catch (err) {
      console.log(err);
    }
  }

  async function allResults() {
    const result = await getHits();
    const { hitsPerPage } = result;
    const { nbHits } = result;
    const { nbPages } = result;
    setResult(result);
    setHitsPerPage(hitsPerPage);
    setNbHits(nbHits);
    setNbPages(nbPages);
  }

  useEffect(() => {
    if (!q) return null;
    allResults();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  console.log(result);

  return (
    <>
      <div className="">
        <TopMenu />
        <Navbar />
      </div>
      <ProductContainer
        result={result}
        hitsPerPage={hitsPerPage}
        nbHits={nbHits}
        nbPages={nbPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
