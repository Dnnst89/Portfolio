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
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 w-full">
        {hits
          ? hits.map((item) => {
            const coverImage = item.coverImage
            return <ProductCard key={item.id} id={item.id} name={item.name} defaultPrice={item.defaultPrice} coverImage={coverImage} brand={item.brand} />;
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
