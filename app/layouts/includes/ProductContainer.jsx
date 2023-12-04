"use client";
import Image from "next/image";
import ProductCard from "../../../components/ProductCard";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";
const ProductContainer = ({
  result,
  hitsPerPage,
  nbHits,
  nbPages,
  currentPage,
  setCurrentPage,
}) => {
  const { hits } = result;

  useEffect(() => {
    // Desplaza la página al inicio al cargar el componente
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <> {nbHits > 0 ? (
      <div>
        <div className="flex flex-wrap max-w-screen-xl m-auto justify-center">
          {hits
            ? hits.map((item) => {
              return (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  defaultPrice={item.defaultPrice}
                  coverImage={item.coverImage}
                  brand={item.brand}
                />
              );
            })
            : null}
        </div>
        <Pagination
          hitsPerPage={hitsPerPage}
          nbHits={nbHits}
          nbPages={nbPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    ) : (<div className="text-center grid content-center h-80 m-auto"> <h1 className="font-bold">¡Lo sentimos!</h1> <h2>No se encontraron resultados.</h2> </div>)} </>
  );
};
export default ProductContainer;
