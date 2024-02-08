"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import ProductDetail from "./ProductDetail";
import ProductDetailSecondary from "./ProductDetailSecondary";
import RelatedItems from "./RelatedItems";
import ProductDetailQuery from "@/src/graphQl/queries/getProductById";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";

export default function DetailComponent({ id }) {
  const { loading, error, data } = useQuery(ProductDetailQuery, {
    variables: { id },
  });

  const [toastShown, setToastShown] = useState(false);

  // Mostrar toast cuando data es null
  useEffect(() => {
    if (!data && !toastShown) {
      toast.error("Lo sentimos, ha ocurrido un error al cargar los datos", {
        autoClose: 5000,
      });
      setToastShown(true);
    }
  }, [data, toastShown]);

  if (error) {
    return toast.error(
      "Lo sentimos, ha ocurrido un error al cargar los datos",
      {
        autoClose: 5000,
      }
    );
  }

  if (!data || !data.product || !data.product.data) {
    return (
      <div className="max-w-screen-xl m-auto">
        <p>
          Ocurrió un problema con los datos. No se encontraron datos válidos.
        </p>
      </div>
    );
  }

  return (
    <div
      className={loading ? "grid place-items-center" : "max-w-screen-xl m-auto"}
    >
      {loading ? (
        <Spinner />
      ) : (
        <div>
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
        </div>
      )}
    </div>
  );
}
