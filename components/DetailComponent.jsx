"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import ProductDetail from "./ProductDetail";
import ProductDetailSecondary from "./ProductDetailSecondary";
import RelatedItems from "./RelatedItems";
import ProductDetailQuery from "@/src/graphQl/queries/getProductById";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";





export default function DetailComponent({ id, idVariant}) {

  const [querySearch, setQuerySearch] = useState("");

  useEffect(() => {
    setQuerySearch(window?.location?.search?.split("?")[1]);

  }, []);

  // const [filterType, filterValue] = querySearch.split("&");

  // const [idVar, idV] = filterValue.split("=");
   const idV=  163;
  
  
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
              <ProductDetail product={data.product.data} variantId={idV || null}/>
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
                {console.log(id)}
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
