"use client";
import { useQuery } from "@apollo/client";
import ProductDetail from "./ProductDetail";
import ProductDetailSecondary from "./ProductDetailSecondary";
import RelatedItems from "./RelatedItems";
import ProductDetailQuery from "@/src/graphQl/queries/getProductById";

export default function DetailComponent({ id }) {
  const { loading, error, data } = useQuery(ProductDetailQuery, {
    variables: { id },
  });

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error.message}</p>

  return (
    <main>
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
      <RelatedItems />
    </main>
  );
}
