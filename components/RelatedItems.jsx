"use client";
import ProductCard from "./ProductCard";

const RelatedItems = () => {

  const name="Juguete"
  const defaultPrice=8900
  const url="/uploads/juguete3_10b4adc7f0.jpg"

  return (
    <div className="flex grid w-full justify-center">
      <div className="flex justify-center p-6">
        <h1 className="text-lg shadow-text">
          Encuentra nuestros articulos relacionados
        </h1>
      </div>
      <section className="flex flex-wrap max-w-screen-xl m-auto justify-center">
        <ProductCard name={name} defaultPrice={defaultPrice} url={url}/>
        <ProductCard name={name} defaultPrice={defaultPrice} url={url}/>
        <ProductCard name={name} defaultPrice={defaultPrice} url={url}/>
        <ProductCard name={name} defaultPrice={defaultPrice} url={url}/>
      </section>
    </div>
  );
};

export default RelatedItems;
