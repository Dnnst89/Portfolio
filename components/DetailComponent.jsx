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
import GET_ERROR_INFO from "@/src/graphQl/queries/getErrorInfo";

export default function DetailComponent({ id }) {
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
              <ProductDetail product={data.product.data} />
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
