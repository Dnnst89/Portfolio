"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import ProductDetail from "./ProductDetail";
import ProductDetailSecondary from "./ProductDetailSecondary";
import RelatedItems from "./RelatedItems";
import ProductDetailQuery from "@/src/graphQl/queries/getProductById";
import GET_CART_ITEM_BY_ID from "@/src/graphQl/queries/getCartItemById";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";





export default function DetailComponent({ id, idVariant}) {

  const [querySearch, setQuerySearch] = useState("");
  const [idVariantSelected, setIdVariantSelected] = useState();
  const [idItemSelected, setIdItemSelected] = useState();

  useEffect(() => {
    const queryString = window?.location?.search?.split("?")[1];
    setQuerySearch(queryString);
}, []); 

useEffect(() => {

  if (querySearch) {
    const [filterType, filterValue, itemId] = querySearch.split("&");
 
    console.log(itemId);
    // Verificar si la URL contiene la cadena esperada
    const containsProductId = filterType.includes("productId");
    if(filterValue && itemId){
    const containsIdVariant = filterValue.includes("idVariant");
    const containsIdItem = itemId.includes("itemId")
  

    if (containsProductId && containsIdVariant && containsIdItem) {

        // Extraer el id de la variante y establecerlo en el estado
        const [, idV] = filterValue.split("=");
        setIdVariantSelected(idV);
        const [ ,idItem] = itemId.split("=");
        setIdItemSelected(idItem);
    } else {
        setIdVariantSelected(null);
        setIdItemSelected(null);
    }
  }
}
}, [querySearch]); 

// const{ dataCartItem, load}= useQuery(GET_CART_ITEM_BY_ID,{
//   variables: {
//     id: 2182
//   },
// });
// console.log(idItemSelected);
// console.log(dataCartItem);

  const [errorToastShown, setErrorToastShown] = useState(false);

  const { loading, error, data } = useQuery(ProductDetailQuery, {
    variables: { id },
  });

  const router = useRouter();
  // Verificar si hay un error en la consulta

  if (error && !errorToastShown) {
    setErrorToastShown(true);
    toast.error("Lo sentimos, ha ocurrido un error al cargar los datos", {
      autoClose: 5000,
    });
  }

  // Mostrar la página incluso si data es nulo
  return (
    <div
      className={loading ? "grid place-items-center" : "max-w-screen-xl m-auto"}
    >
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {data && data.product && data.product.data ? (
            <>
              <ProductDetail product={data.product.data} variantId={idVariantSelected || null} itemId={idItemSelected || null }/>
              <ProductDetailSecondary
                id={data.product.data.id}
                description={data.product.data.attributes.description}
                reviews={data.product.data.attributes.reviews.data}
              />
              <RelatedItems
                categories={data.product.data.attributes.categories.data}
                productId={data.product.data.id}
              />
            </>
          ) : (
            !errorToastShown && (
              <div>
                {setErrorToastShown(true)}
                {toast.error(
                  "Ha ocurrido un error al obtener los datos del producto seleccionado. Inténtalo de nuevo.",
                  {
                    autoClose: 5000,
                  }
                )}
              </div>
            )
          )}

          {errorToastShown && (
            <div className="text-center my-48">
              <button
                onClick={() => {
                  router.push("/");
                }}
                className="bg-aquamarine text-white rounded-sm p-2 w-[150px]"
              >
                Ir a inicio
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
