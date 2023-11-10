"use client";
import ProductCard from "./ProductCard";
import ProductsByCategory from "@/src/graphQl/queries/getProductsByCategory";
import { useQuery } from "@apollo/client";
import FilterProductCard from "./FilterProductCard";

function RelatedItems({ categories, productId }) {

  const category = categories[0].attributes.name
  const { loading, error, data } = useQuery(ProductsByCategory, {
    variables: { category },
  });

  if (loading) return 'Cargando...'
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

  const aux = [];
  for (let i = 0; i <= 3; i++) {
    if (i < myArray.length) {
      const random = myArray[i]
      if (data?.products.data[random].id != productId) {
        aux.push(data?.products.data[random]);
      } else if (myArray.length > 4) {
        aux.push(data?.products.data[myArray[4]]);
      }
    }
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
            return <FilterProductCard key={item.id} id={item.id} name={item.attributes.name} coverImage={item.attributes.coverImage.data} defaultPrice={item.attributes.defaultPrice} brand={item.attributes.brand} />;
          })
          : null}
      </section>
    </div>
  );
};

export default RelatedItems;
