"use client";
import Image from "next/image";
import FilterProductCard from "./FilterProductCard";
import FilterPagination from "./FilterPagination";
import { useEffect, useState } from "react";

const ProductFilterContainer = ({ result, currentPage, setCurrentPage }) => {
  useEffect(() => {
    // Desplaza la página al inicio al cargar el componente
    window.scrollTo(0, 0);
  }, [currentPage]);

  const { data } = result;
  return (
    <>
      <div className="flex flex-wrap items-center justify-center w-full m-auto sm:p-4">
        {data
          ? data.map((item) => {
           {console.log("item",item)}
              return (
                <FilterProductCard
                  key={item.id}
                  id={item.id}
                  name={item.attributes.name}
                  coverImage={item.attributes.coverImage.data}
                  totalPrice={item?.attributes?.variants?.data[0]?.attributes?.totalPrice}              
                  brand={item.attributes.brand}
                  initialAge={
                    item?.attributes?.variants?.data[0]?.attributes?.initialAge
                  }
                  finalAge={
                    item?.attributes?.variants?.data[0]?.attributes?.finalAge
                  }
                />
              );
            })
          : null}
      </div>
      <FilterPagination
        nbPages={result.meta.pagination.pageCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};
export default ProductFilterContainer;
