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
import GET_ERROR_INFO from "@/src/graphQl/queries/getErrorInfo";

export default function DetailComponent({ id, idVariant }) {
  const [querySearch, setQuerySearch] = useState("");
  const [idVariantSelected, setIdVariantSelected] = useState();
  const [idItemSelected, setIdItemSelected] = useState();

  //obtengo el url
  useEffect(() => {
    const queryString = window?.location?.search?.split("?")[1];
    setQuerySearch(queryString);
  }, []);

  //obtengo los valores de productId, idVariant y ItemQt que viene en la url
  useEffect(() => {
    if (querySearch) {
      const [filterType, filterValue, ItemQt] = querySearch.split("&");

      // Verificar si la URL contiene la cadena esperada
      const containsProductId = filterType.includes("productId");
      if (filterValue && ItemQt) {
        const containsIdVariant = filterValue.includes("idVariant");
        const containsIdItem = ItemQt.includes("ItemQt");

        if (containsProductId && containsIdVariant && containsIdItem) {
          // Extraer el id de la variante y establecerlo en el estado
          const [, idV] = filterValue.split("=");
          setIdVariantSelected(idV);
          const [, idItem] = ItemQt.split("=");
          setIdItemSelected(idItem);
        } else {
          setIdVariantSelected(null);
          setIdItemSelected(null);
        }
      }
    }
  }, [querySearch]);

  const [errorToastShown, setErrorToastShown] = useState(false);

  const { loading, error, data } = useQuery(ProductDetailQuery, {
    variables: { id },
  });
  const { data: errorMessage } = useQuery(GET_ERROR_INFO, {
    variables: { id: 13 },
  });
  const { data: errorMessageProduct } = useQuery(GET_ERROR_INFO, {
    variables: { id: 14 },
  });

  const router = useRouter();
  // Verificar si hay un error en la consulta

  if (error && !errorToastShown) {
    setErrorToastShown(true);
    toast.error(errorMessage.errorInformation.data.attributes.error_message, {
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
              <ProductDetail
                product={data.product.data}
                variantId={idVariantSelected || null}
                ItemQt={idItemSelected || null}
              />
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
                  errorMessageProduct.errorInformation.data.attributes
                    .error_message,
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
