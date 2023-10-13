"use client";
import ProductCard from "./ProductCard";
import ProductsByCategory from "@/src/graphQl/queries/getProductsByCategory";
import { useQuery } from "@apollo/client";
import AgeProductCard from "./AgeProductCard";

const RelatedItems = (categories) => {

  const category = categories.categories[0].attributes.name
  const { loading, error, data } = useQuery(ProductsByCategory, {
    variables: { category },
  });

  if (loading) return 'Loading...'
  if (error) return toast.error("Lo sentimos, ha ocurrido un error al cargar los datos", {
    autoClose: 5000
  })

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const max = data?.products.data.length
  const aux = [];
  for (let i = 1; i <= 4; i++) {
    aux.push(data?.products.data[getRandomInt(max)]);
  }


  return (
    <div className="flex grid w-full justify-center">
      <div className="flex justify-center p-6 pt-10">
        <h1 className="text-xl shadow-text font-bold">
          Encuentra nuestros articulos relacionados
        </h1>
      </div>
      <section className="flex flex-wrap max-w-screen-xl m-auto justify-center">
        {aux
          ? aux.map((item) => {
            return <AgeProductCard key={item.id} id={item.id} name={item.attributes.name} coverImage={item.attributes.coverImage.data} defaultPrice={item.attributes.brand} />;
          })
          : null}
      </section>
    </div>
  );
};

export default RelatedItems;
