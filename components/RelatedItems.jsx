"use client";
import ProductCard from "./ProductCard";

const RelatedItems = () => {
  return (
    <div>
      <div className="flex justify-center p-6">
        <h1 className="text-lg shadow-text">
          Encuentra nuestros articulos relacionados
        </h1>
      </div>
      <section className="flex justify-center">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </section>
    </div>
  );
};

export default RelatedItems;
