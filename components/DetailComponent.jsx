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

export default function DetailComponent({
  id,
  handleGoBack,
  handleGoToCategory,
}) {
  const { data: errorMessage } = useQuery(GET_ERROR_INFO, {
    variables: { id: 13 },
  });
  const { data: errorMessageProduct } = useQuery(GET_ERROR_INFO, {
    variables: { id: 14 },
  });
  const [querySearch, setQuerySearch] = useState("");
  const [idVariantSelected, setIdVariantSelected] = useState();
  const [idItemSelected, setIdItemSelected] = useState();
  const [idCurrencySelected, setIdCurrencySelected] = useState();
  const [idAmountSelected, setIdAmountSelected] = useState();
console.log("currency data",idCurrencySelected)
console.log("amount data",idAmountSelected)
  //obtengo el url
  useEffect(() => {
    const queryString = window?.location?.search?.split("?")[1];
    setQuerySearch(queryString);
  }, []);

  console.log("que valores traigo aqui",querySearch)

  //obtengo los valores de productId, idVariant y ItemQt también el currency que viene en la url
  useEffect(() => {
    if (querySearch) {
      const [filterType, filterValue, ItemQt,Currency,Amount] = querySearch.split("&");

      // Verificar si la URL contiene la cadena esperada
      const containsProductId = filterType.includes("productId");
      if (filterValue && ItemQt) {
        const containsIdVariant = filterValue.includes("idVariant");
        const containsIdItem = ItemQt.includes("ItemQt");
        const containsCurrency = Currency.includes("currency");
        const containsAmount = Amount.includes("amount");
        if (containsProductId && containsIdVariant && containsIdItem && containsCurrency && containsAmount) {
          // Extraer el id de la variante y establecerlo en el estado
          const [, idV] = filterValue.split("=");
          setIdVariantSelected(idV);
          const [, idItem] = ItemQt.split("=");
          setIdItemSelected(idItem);
          const [, idCurrency] = Currency.split("=");
          setIdCurrencySelected(idCurrency);
          const [, idAmount] = Amount.split("=");
          setIdAmountSelected(idAmount);
        } else {
          setIdVariantSelected(null);
          setIdItemSelected(null);
          setIdCurrencySelected(null);
          setIdAmountSelected(null);
        }
      }
    }
  }, [querySearch,idCurrencySelected,idAmountSelected]);
  console.log("que valores currency finally",idCurrencySelected)
  console.log("que valores amount finally",idAmountSelected)

  const [errorToastShown, setErrorToastShown] = useState(false);

  const { loading, error, data } = useQuery(ProductDetailQuery, {
    variables: { id },
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
                Currency ={idCurrencySelected || null}
                Amount={idAmountSelected || null}
                handleGoBack={handleGoBack}
                handleGoToCategory={handleGoToCategory}
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
