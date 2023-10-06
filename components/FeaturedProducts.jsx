"use client";
import Link from "next/link";
import AgeProductCard from "./AgeProductCard";
import { useEffect, useState } from "react";
import { strapiInstance } from "@/src/axios/algoliaIntance/config";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getFeaturedProducts();
  }, []);
  const getFeaturedProducts = async () => {
    const { data } = await strapiInstance.get(
      "/api/products?populate=*&filters[featured][$eq]=truepagination[page]=1&pagination[pageSize]=3"
    );
    setProducts(data.data);
  };

  return (
    <>
      {products.length &&
        products.map((item) => (
          <div className="flex  justify-center pt-2" key={item.id}>
            <AgeProductCard
              name={item.attributes.name}
              defaultPrice={item.attributes.defaultPrice}
              id={item.id}
              url={"/uploads/juguete4_36d71de373.jpg"}
              coverImage={item.attributes.coverImage.data}
            />
          </div>
        ))}
    </>
  );
};

export default FeaturedProducts;
