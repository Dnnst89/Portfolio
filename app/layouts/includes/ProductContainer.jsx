"use client";
import Product from "../../../components/Product";
import productsData from "../../data/products.json";

const ProductContainer = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 w-full">
        {productsData.data.map((item) => {
          let variant = item.attributes.variants;
          return (
            <Product
              key={item.id}
              name={item.attributes.name}
              brand={item.attributes.brand}
              url={variant.data[0].attributes.images.data[0].attributes.url}
              price={variant.data[0].attributes.price}
            />
          );
        })}
      </div>
    </>
  );
};

export default ProductContainer;
