"use client";
import Image from "next/image";
import Product from "../../../components/ProductCard";
import productsData from "../../data/products.json";
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
            const {coverImage} = item
            let primero = coverImage[0];
            const {url} = primero
              return <Product key={item.id} id={item.id} name={item.name} defaultPrice={item.defaultPrice} url={url}/>;
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
