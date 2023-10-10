"use client";
import Image from "next/image";
import ProductCard from "../../../components/ProductCard";
import Pagination from "@/components/Pagination";
const ProductContainer = ({
  result,
  hitsPerPage,
  nbHits,
  nbPages,
  currentPage,
  setCurrentPage,
}) => {
  const { hits } = result;
  
  return (
    <>
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
    </>
  );
};
export default ProductContainer;
