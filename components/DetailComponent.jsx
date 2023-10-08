"use client";
import { useQuery } from "@apollo/client";
import ProductDetail from "./ProductDetail";
import ProductDetailSecondary from "./ProductDetailSecondary";
import RelatedItems from "./RelatedItems";
import ProductDetailQuery from "@/src/graphQl/queries/getProductById";
import Spinner from "@/components/Spinner";
import toast, { Toaster } from "react-hot-toast";

export default function DetailComponent({ id }) {
  const { loading, error, data } = useQuery(ProductDetailQuery, {
    variables: { id },
  });

  if (error) return toast.error("Lo sentimos, ha ocurrido un error al cargar los datos", {
    autoClose: 5000
  })

  return (
    <div className={loading ? "grid place-items-center" : " max-w-screen-xl m-auto"}>
      {loading ? <Spinner /> : <div> <Toaster />
        <ProductDetail
          name={data?.product.data.attributes.name}
          description={data?.product.data.attributes.description}
          sku={data?.product.data.attributes.sku}
          variants={data?.product.data.attributes.variants.data}
          materials={data?.product.data.attributes.materials.data}
        />
        <ProductDetailSecondary
          id={data?.product.data.id}
          description={data?.product.data.attributes.description}
          reviews={data?.product.data.attributes.reviews.data}
        />
  <RelatedItems/></div>
        }
    </div>
  );
}
