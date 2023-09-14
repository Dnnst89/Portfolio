"use client";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

const FeaturedProducts = () => {

  const [products, setProducts] = useState([])

	useEffect(() => {
		fetch(
      `http://ec2-54-189-90-96.us-west-2.compute.amazonaws.com:1337/api/products?populate=*&filters[featured][$eq]=truepagination[page]=1&pagination[pageSize]=3`,
    )
		.then(response => response.json())
		.then(datos => {
			setProducts(datos.data)
           
		})
	}, [])
    console.log(products)

  return (
    <>
    
          {products && products.length && products.map((item) => (
         <div className="flex  justify-center pt-10">
     
      <ProductCard name={item.attributes.name} defaultPrice={item.attributes.defaultPrice} url={"/uploads/juguete4_36d71de373.jpg"} />
    </div>
    
      ))}
        
    </>
  );
  
};

export default FeaturedProducts;

