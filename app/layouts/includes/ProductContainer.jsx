"use client";
import Image from "next/image";
import Product from "../../../components/Product";
import Pagination from "@/components/Pagination";

const ProductContainer = ({ result, hitsPerPage, nbHits, nbPages, currentPage, setCurrentPage }) => {

  const {hits} = result
 
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 w-full">
        {hits
          ? hits.map((item) => {
            return <Product key={item.id} name={item.name} />;
          })
          : null}
      </div>
      <Pagination hitsPerPage={hitsPerPage} nbHits={nbHits} nbPages={nbPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </>
  );
};
export default ProductContainer;
