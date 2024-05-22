"use client";
import Image from "next/image";
import ProductCard from "../../../components/ProductCard";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { useLocalCurrencyContext } from "@/src/context/useLocalCurrency";

const ProductContainer = ({
  result,
  hitsPerPage,
  nbHits,
  nbPages,
  currentPage,
  setCurrentPage,
  loading,
  setLoading,
}) => {
    // if true send LocalCurrencyPrice as price for products else send variant price
    const useLocalCurrency = useLocalCurrencyContext();

  const { hits } = result;

  useEffect(() => {
    // Desplaza la página al inicio al cargar el componente
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className={loading ? "grid place-items-center" : ""}>
      {loading ? (
        <Spinner />
      ) : nbHits > 0 ? (
        <>
          <div className="flex flex-wrap items-center justify-center w-full m-auto sm:p-4">
            {hits
              ? hits.map((item) => {
                return (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    variantPrice={ useLocalCurrency ? parseFloat(item?.variants[0]?.localCurrencyPrice).toLocaleString("en-US", {
                      minimumFractionDigits: 2,  
                      }): parseFloat(item?.variants[0]?.price).toLocaleString("en-US", {
                        minimumFractionDigits: 2,  
                        })}
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
        </>
      ) : (
        <div className="text-center grid content-center h-80 m-auto">
          <h1 className="font-bold">¡Lo sentimos!</h1>{" "}
          <h2>No se encontraron resultados.</h2>{" "}
        </div>
      )}
    </div>
  );
};
export default ProductContainer;
