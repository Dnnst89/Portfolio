"use client";

import AgeProductCard from "./AgeProductCard";
//GQL
import { useQuery } from "@apollo/client";
import GET_FEATURED_PRODUCTS from "@/src/graphQl/queries/getFeaturedProducts";

const FeaturedProducts = () => {


  //GQL
  const { loading, error, data } = useQuery(GET_FEATURED_PRODUCTS);

  if (loading) return 'Loading...'
  if (error) return toast.error("Lo sentimos, ha ocurrido un error al cargar los datos", {
    autoClose: 5000
  })


  const max = data?.products.data.length
  const myArray = []
  while (myArray.length < max) {
    var num = Math.floor(Math.random() * max);
    var exist = false;
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i] == num) {
        exist = true;
        break;
      }
    }
    if (!exist) {
      myArray[myArray.length] = num;
    }
  }

  //tomamos los primeros cuatro resultados del random anterior
  const aux = [];
  for (let i = 0; i <= 3; i++) {
    if (i < myArray.length) {
      const random = myArray[i]
      aux.push(data?.products.data[random]);
    }
  }

  return (
    <>
      {aux
        ? aux.map((item) => {
          return <div role="link" className="flex  justify-center pt-2" key={item.id}>
            <AgeProductCard
              key={item.id}
              id={item.id}
              name={item.attributes.name}
              coverImage={item.attributes.coverImage.data}
              defaultPrice={item.attributes.defaultPrice}
              brand={item.attributes.brand}
            />
          </div>;
        })
        : null}
    </>
  );
};

export default FeaturedProducts;
